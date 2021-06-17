/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import ShareModal from '../../../../components/ShareModal';
import MONTHS from '../../../../@types/MONTHS';
import ActivityIndicator from '../../../../components/ActivityIndicator';
import Button from '../../../../components/Button';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import api from '../../../../services/api';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function OmaPage({
  agency,
  year,
  month,
  fullName,
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  crawlingTime,
}) {
  const [previousButtonActive, setPreviousButtonActive] = useState(true);
  const [nextButtonActive, setNextButtonActive] = useState(true);
  const [chartData, setChartData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [fileLink, setFileLink] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function getNextDate() {
    let m = parseInt(month, 10);
    let y = parseInt(year, 10);
    if (m === 12) {
      m = 1;
      y += 1;
    } else {
      m += 1;
    }
    return { m, y };
  }

  function getPreviousDate() {
    let m = parseInt(month, 10);
    let y = parseInt(year, 10);
    if (m === 1) {
      m = 12;
      y -= 1;
    } else {
      m -= 1;
    }
    return { m, y };
  }

  const router = useRouter();

  async function checkNextYear() {
    let activateButtonNext = true;
    const { m, y } = getNextDate();
    if (y !== undefined) {
      await api.get(`/orgao/salario/${agency}/${y}/${m}`).catch(_err => {
        activateButtonNext = false;
      });
      setNextButtonActive(activateButtonNext);
    }
  }

  async function checkPreviousYear() {
    let activateButtonPrevious = true;
    const { m, y } = getPreviousDate();
    if (y !== undefined) {
      await api.get(`/orgao/salario/${agency}/${y}/${m}`).catch(_err => {
        activateButtonPrevious = false;
      });
      setPreviousButtonActive(activateButtonPrevious);
    }
  }

  // this effect is using the page changing as a hook to fetch the data from api
  useEffect(() => {
    // frist of all it sets the loading state to loading to feedback the user thats loading the data from api
    setLoading(true);
    // then it checks the next and the previous year to block the navigation buttons or to help to choose the right year
    checkNextYear();
    checkPreviousYear();
    // finally it fetchs the data from the api to fill the chart with the agency/month/year data
    fetchChartData();
  }, [year, month]);
  async function fetchChartData() {
    try {
      const { data } = await api.get(
        `/orgao/salario/${agency}/${year}/${month}`,
      );
      // after get the data from api the state is updated with the chart data
      setChartData(data);
      setFileLink(data.PackageURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  function handleNavigateToNextSummaryOption() {
    const { m, y } = getNextDate();
    setLoading(true);
    router.push(`/orgao/${agency}/${y}/${m}`);
  }
  function handleNavigateToPreviousSummaryOption() {
    const { m, y } = getPreviousDate();
    setLoading(true);
    router.push(`/orgao/${agency}/${y}/${m}`);
  }

  return (
    <Page>
      <Head>
        <title>OMA/{agency.toUpperCase()}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados do mês ${month} no ano ${year} na agência ${fullName}`}
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header theme="LIGHT" />
      <MainGraphSection>
        <MainGraphSectionHeader>
          <h2>
            {fullName} ({agency.toLocaleUpperCase('pt')})
          </h2>
          <div>
            <button
              className="left"
              onClick={() => handleNavigateToPreviousSummaryOption()}
              type="button"
              disabled={!previousButtonActive}
            >
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
            <span>
              {MONTHS[month]}, {year}
            </span>
            <button
              onClick={() => handleNavigateToNextSummaryOption()}
              type="button"
              disabled={!nextButtonActive}
            >
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
          </div>
          {loading || (
            <span>
              Dados capturados em{' '}
              {(() => {
                const d = new Date(crawlingTime);
                // eslint-disable-next-line prettier/prettier
                return `${d.getDay()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
              })()}
            </span>
          )}
        </MainGraphSectionHeader>
        {loading ? (
          <ActivityIndicatorPlaceholder fontColor="#3e5363">
            <ActivityIndicator spinnerColor="#3e5363" />
            <span>Carregando dados...</span>
          </ActivityIndicatorPlaceholder>
        ) : (
          <>
            <Captions>
              <div>
                <span className="info">
                  <img src="/img/icon_info.svg" alt="info" />
                  <div>
                    <span>
                      <b>Salário:</b> valor recebido de acordo com a prestação
                      de serviços, em decorrência do contrato de trabalho.
                      <br />
                      <br />
                      <b>Remuneração:</b> é a soma do salário mais outras
                      vantagens (indenizações e benefícios). - Benefício:
                      valores eventuais, por exemplo, auxílios alimentação,
                      saúde, escolar... - Membro: é o integrante da carreira
                      'principal' do órgão do sistema de justiça. Por exemplo,
                      juízes, desembargadores, ministros, defensores,
                      procuradores públicos, promotores de justiça, procuradores
                      de justiça, etc...
                    </span>
                  </div>
                </span>
                <span>
                  <h3>{totalMembers} Membros</h3>
                </span>
                <span>
                  <img src="/img/anim-group-2/icon_salario.svg" alt="sallary" />
                </span>
              </div>
              <ul>
                <CaptionItems>
                  <img src="/img/anim-group-2/icon_salario.svg" alt="sallary" />
                  <div>
                    <span>Maior salário: R$ {maxWage.toFixed(2)}</span>
                    <span>Total Salários: R$ {totalWage.toFixed(2)}</span>
                  </div>
                </CaptionItems>
                <CaptionItems>
                  <img
                    src="/img/anim-group-2/icon_beneficio.svg"
                    alt="benefits"
                  />
                  <div>
                    <span>Maior Benefício: R$ {maxPerk.toFixed(2)}</span>
                    <span>Total benefícios: R$ {totalPerks.toFixed(2)}</span>
                  </div>
                </CaptionItems>
              </ul>
            </Captions>
            <ShareModal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            />
            <GraphDivWithPagination>
              <h3>Total de Remunerações de Membros por Mês em {year}</h3>
              <div className="main-chart-wrapper">
                {!chartData.Members ? (
                  <ActivityIndicatorPlaceholder fontColor="#3e5363">
                    <span>Não há dados de membros para esse mês</span>
                  </ActivityIndicatorPlaceholder>
                ) : (
                  <Chart
                    options={{
                      legend: {
                        show: false,
                      },
                      colors: ['#c9a0d0', '#513658'],
                      chart: {
                        stacked: true,
                        toolbar: {
                          show: false,
                        },
                        zoom: {
                          enabled: true,
                        },
                      },
                      responsive: [
                        {
                          breakpoint: 500,
                          options: {
                            chart: {
                              width: '95%',
                            },
                          },
                        },
                      ],
                      plotOptions: {
                        bar: {
                          horizontal: true,
                          barHeight: '70%',
                        },
                      },
                      yaxis: {
                        decimalsInFloat: 2,
                        labels: {
                          show: true,
                          minWidth: 0,
                          maxWidth: 160,
                          style: {
                            colors: [],
                            fontSize: '14px',
                            fontFamily: 'Roboto Condensed, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                          },
                        },
                      },
                      xaxis: {
                        categories: [
                          '> R$ 50 mil',
                          'R$ 40~50 mil',
                          'R$ 30~40 mil',
                          'R$ 20~30 mil',
                          'R$ 10~20 mil',
                          '< R$ 10 mil',
                        ],
                        title: {
                          text: 'Quantidade',
                          offsetY: 30,
                        },
                      },
                      fill: {
                        opacity: 1,
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    }}
                    series={[
                      {
                        name: 'Membros',
                        data: [
                          chartData.Members['-1'],
                          chartData.Members['50000'],
                          chartData.Members['40000'],
                          chartData.Members['30000'],
                          chartData.Members['20000'],
                          chartData.Members['10000'],
                        ],
                      },
                    ]}
                    width="100%"
                    height="500"
                    type="bar"
                  />
                )}
              </div>
              <div className="buttons">
                <div>
                  <a href="/dados/PB">
                    <Button
                      textColor="#2FBB96"
                      borderColor="#2FBB96"
                      backgroundColor="#fff"
                      hoverBackgroundColor="#2FBB96"
                      className="left"
                    >
                      Voltar par anos
                      <img
                        src="/img/icon_calendario_green.svg"
                        alt="callendar"
                      />
                    </Button>
                  </a>
                </div>
                <div>
                  <Button
                    textColor="#3e5363"
                    borderColor="#3e5363"
                    backgroundColor="#fff"
                    hoverBackgroundColor="#3e5363"
                    onClick={() => setModalIsOpen(true)}
                  >
                    Compartilhar
                    <img src="/img/icon_share.svg" alt="share" />
                  </Button>
                  <a href={fileLink}>
                    <Button
                      textColor="#3e5363"
                      borderColor="#3e5363"
                      backgroundColor="#fff"
                      hoverBackgroundColor="#3e5363"
                    >
                      Baixar
                      <img src="/img/icon_download_share.svg" alt="download" />
                    </Button>
                  </a>
                </div>
              </div>
            </GraphDivWithPagination>
          </>
        )}
      </MainGraphSection>
      <Footer theme="LIGHT" />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const { agency, year, month } = context.params;
  try {
    const { data: d2 } = await api.get(
      `/orgao/resumo/${agency}/${year}/${month}`,
    );
    return {
      props: {
        agency,
        year,
        month,
        fullName: d2.FullName,
        totalMembers: d2.TotalMembers,
        maxWage: d2.MaxWage,
        totalWage: d2.TotalWage,
        maxPerk: d2.MaxPerk,
        totalPerks: d2.TotalPerks,
        crawlingTime: d2.CrawlingTime,
      },
    };
  } catch (err) {
    try {
      const { data } = await api.get(`/orgao/totais/${agency}/${year}`);
      const nMonth = data.MonthTotals[data.MonthTotals.length - 1].Month;
      context.res.writeHead(301, {
        Location: `/orgao/${agency}/${year}/${nMonth}`,
      });
      context.res.end();
      return { props: {} };
    } catch (error) {
      context.res.writeHead(301, {
        Location: `/404`,
      });
      context.res.end();
      return { props: {} };
    }
  }
};
const Page = styled.div`
  background: #fff;
`;

const MainGraphSection = styled.section`
  margin-top: 3rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (min-width: 600px) {
    margin-bottom: 4rem;
    margin-left: 8rem;
    margin-right: 8rem;
  }
  text-align: center;
  font-size: 4rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  .buttons {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    div {
      @media (max-width: 600px) {
        justify-content: center;
      }
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      & + div {
        button:hover {
          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }
    @media (max-width: 600px) {
      justify-content: center;
    }
    button {
      font-size: 2rem;
      margin: 1rem;
      position: relative;
      img {
        right: 3rem;
        position: absolute;
      }
    }
  }
`;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  width: 35rem;
  flex-direction: column;
  align-items: center;
  align-self: center;
  h2 {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
  span {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 400;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    button {
      &.left {
        transform: rotate(180deg);
      }
      img {
        position: initial;
      }
      width: 30px;
      color: #3e5363;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background-color: #3e5363;
      &:disabled,
      &[disabled] {
        border: 2px solid #3e5363;
        img {
          filter: invert(75%) sepia(56%) saturate(285%) hue-rotate(163deg)
            brightness(87%) contrast(84%);
        }
        background-color: #fff;
      }
    }
    span {
      img {
        position: initial;
      }
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
`;
const Captions = styled.div`
  padding: 2rem;
  width: 100%;
  min-width: 34rem;
  justify-content: center;
  color: #3e5363;
  background: rgba(62, 83, 99, 0.05);
  div {
    padding: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      &.info {
        position: relative;
        div {
          background-color: #ced9e1;
          color: #3e5363;
          width: 800%;
          z-index: 100;
          padding: 2rem;
          font-size: 2rem;
          text-align: left;
          b {
            font-size: 1.5rem;
          }
          display: none;
          position: absolute;
        }
        &:hover {
          div {
            display: block;
          }
        }
      }
      h3 {
        text-align: center;
        font-size: 2rem;
      }
    }
    img {
      background-color: #3e5363;
      border-radius: 50%;
      width: 4rem;
    }
    align-items: center;
  }
  ul {
    list-style: none;
    margin-top: 3rem;
    border-top: 1px solid #3e5363;
    padding: 1rem 1rem;
    padding-top: 2rem;
    display: flex;
    transition: all 1s ease;
    flex-wrap: wrap;
    justify-content: space-around;
    @media (max-width: 600px) {
      justify-content: flex-start;
    }
  }
`;
const CaptionItems = styled.li`
  display: flex;
  align-items: center;
  & + li {
    @media (max-width: 765px) {
      margin-top: 5rem;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1.5rem;
    width: fit-content;
  }
  button.active {
    opacity: 0.4;
    width: 65%;
  }
  img {
    width: 4rem;
    background: #3e5363;
    border-radius: 50%;
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3e5363;
    margin: 10px 0;
    text-align: left;
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
const GraphDivWithPagination = styled.div`
  margin-top: 3rem;
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  color: #3e5363;
  background: rgba(62, 83, 99, 0.06);
  h3 {
    padding: 1.5rem;
  }
  .main-chart-wrapper {
    width: 100%;
    div {
      & > * {
        font-size: 125%;
      }
      text {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 2.5rem;
        @media (max-width: 600px) {
          font-size: 2rem;
        }
        color: #fff;
        font-weight: bold;
        &.title {
          font-size: 120%;
        }
      }
    }
    padding-bottom: 1rem;
    border-bottom: 2px solid #3e5363;
  }
  margin-bottom: 3rem;
`;
const ActivityIndicatorPlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 0;
  span {
    margin-top: 3rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
  font-size: 3rem;
  align-items: center;
`;
