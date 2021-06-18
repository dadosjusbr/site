/* eslint-disable no-restricted-syntax */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import ActivityIndicator from '../../components/ActivityIndicator';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import MONTHS from '../../@types/MONTHS';
import DropDownGroupSelector from '../../components/DropDownGroupSelector';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
// this constant is used to placehold the max value of a chart data
const MaxMonthPlaceholder = 29000321;
export default function SummaryPage({ dataList, summary }) {
  const router = useRouter();
  function handleNavigateBetweenSummaryOptions(option: string) {
    router.push(`/dados/${option}`);
  }
  return (
    <Page>
      <Head>
        <title>Dados/{summary}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados do estado: ${summary}`}
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header />
      <DropDownGroupSelector
        value={summary}
        onChange={a => {
          handleNavigateBetweenSummaryOptions(a.currentTarget.value);
        }}
      />
      <div>
        {(() => {
          if (dataList.length === 0) {
            return (
              <ActivityIndicatorPlaceholder>
                Ocorreu um erro.
              </ActivityIndicatorPlaceholder>
            );
          }
          return dataList.map(agency => (
            <GraphWithNavigation
              key={agency.Name}
              title={agency.FullName}
              id={agency.Name}
            />
          ));
        })()}
      </div>
      <Footer />
    </Page>
  );
}
// this component is used to to build the main section, with charts and pagination.
// his load some agency so, it needs params to load it.
// the id is the main identifier.
// the title is the vocative from the componenet.

const GraphWithNavigation: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  // this state is used to store the api fetched data after fetch it
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [dataLoading, setDataLoading] = useState(true);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [navigableMonth, setNavigableMonth] = useState<any>();
  // this state is used to determine the last month navigable in the given year, to allows to use th "see months" button to navigate to it
  useEffect(() => {
    setDataLoading(true);
    fetchAgencyData();
  }, [year]);
  async function fetchAgencyData() {
    try {
      const { data: agency } = await api.get(`/orgao/totais/${id}/${year}`);
      setData(agency.MonthTotals ? agency.MonthTotals : []);
      // sets the navigable month in the application state to the last navigable month for the given year
      setNavigableMonth(
        agency.MonthTotals
          ? agency.MonthTotals[agency.MonthTotals.length - 1].Month
          : 1,
      );
      setDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  const chartRef = useRef<{ export: () => void }>(null);

  const exportChart = () => {
    if (chartRef && chartRef.current) {
      chartRef.current?.export();
    }
  };
  function generateGraphWithNavigation() {
    return (
      <MainGraphSection>
        <MainGraphSectionHeader>
          <a href={`/orgao/${id}/${year}/${navigableMonth}`}>
            <h2>
              {title} ({id.toLocaleUpperCase('pt')})
            </h2>
          </a>
          <div>
            <button
              className="left"
              onClick={() => setYear(year - 1)}
              type="button"
            >
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
            <span>{year}</span>
            <button onClick={() => setYear(year + 1)} type="button">
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </MainGraphSectionHeader>
        <Captions>
          <div>
            <span>
              <h3>
                Total de Remunerações de Membros em {year}: R${' '}
                {(() => {
                  // this function is used to sum the data from all money arrays and generate the last remuneration value
                  let total = 0;
                  const monthlyTotals = data.map(
                    d => d.Perks + d.Others + d.Wage,
                  );
                  monthlyTotals.forEach(w => {
                    total += w;
                  });
                  // here we return the final value to millions showing 2 decimal places
                  return (total / 1000000).toFixed(2);
                })()}
                M
              </h3>
            </span>
            <span className="info">
              <img src="/img/icon_info.svg" alt="info" />
              <div>
                <span>
                  <b>Salário:</b> valor recebido de acordo com a prestação de
                  serviços, em decorrência do contrato de trabalho.
                  <br />
                  <br />
                  <b>Benefícios:</b> Qualquer remuneração recebida por um
                  funcionário que não seja proveniente de salário. Exemplos de
                  benefícios são: diárias, gratificações, remuneração por função
                  de confiança, benefícios pessoais ou eventuais, auxílios
                  alimentação, saúde, escolar...
                </span>
              </div>
            </span>
          </div>
          <ul>
            <CaptionItems>
              <button
                type="button"
                onClick={e => {
                  if (hidingWage) {
                    e.currentTarget.classList.remove('active');
                    setHidingWage(false);
                  } else {
                    e.currentTarget.classList.add('active');
                    setHidingWage(true);
                  }
                }}
              >
                <img
                  src="/img/data-graph-captions/icon_salario.svg"
                  alt="sallary"
                />
              </button>
              <span>
                Salário:
                <br />
                <b>
                  R${' '}
                  {(() => {
                    let total = 0;
                    const wages = data.map(d => d.Wage);
                    wages.forEach(w => {
                      total += w;
                    });
                    return (total / 1000000).toFixed(2);
                  })()}
                  M
                </b>
              </span>
            </CaptionItems>
            <CaptionItems>
              <button
                type="button"
                onClick={e => {
                  if (hidingBenefits) {
                    e.currentTarget.classList.remove('active');
                    setHidingBenefits(false);
                  } else {
                    e.currentTarget.classList.add('active');
                    setHidingBenefits(true);
                  }
                }}
              >
                <img
                  src="/img/data-graph-captions/icon_beneficio.svg"
                  alt="benefits"
                />
              </button>
              <span>
                Benefícios:
                <br />
                <b>
                  R${' '}
                  {(() => {
                    let total = 0;
                    const monthlyTotals = data.map(d => d.Perks + d.Others);
                    monthlyTotals.forEach(w => {
                      total += w;
                    });
                    return (total / 1000000).toFixed(2);
                  })()}
                  M
                </b>
              </span>
            </CaptionItems>
            <CaptionItems>
              <button
                onClick={e => {
                  if (hidingNoData) {
                    e.currentTarget.classList.remove('active');
                    setHidingNoData(false);
                  } else {
                    e.currentTarget.classList.add('active');
                    setHidingNoData(true);
                  }
                }}
                type="button"
              >
                <img
                  src="/img/data-graph-captions/icon_semdados.svg"
                  alt="no-data"
                />
              </button>
              <span>Sem dados</span>
            </CaptionItems>
          </ul>
        </Captions>
        <GraphDivWithPagination>
          <h3>Total de Remunerações de Membros por Mês em {year}</h3>
          {dataLoading ? (
            <ActivityIndicatorPlaceholder fontColor="#3e5363">
              <ActivityIndicator spinnerColor="#3e5363" />
              <span>Aguarde...</span>
            </ActivityIndicatorPlaceholder>
          ) : (
            <>
              {data.length > 0 ? (
                <div className="main-chart-wrapper">
                  <Chart
                    options={{
                      colors: ['#97BB2F', '#2FBB96', '#000000'],
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
                            legend: {
                              position: 'bottom',
                              offsetX: -10,
                              offsetY: 0,
                            },
                            chart: {
                              width: '100%',
                            },
                            yaxis: {
                              decimalsInFloat: 2,
                              labels: {
                                show: true,
                                minWidth: 0,
                                maxWidth: 50,
                                style: {
                                  colors: [],
                                  fontSize: '10rem',
                                  fontFamily: 'Roboto Condensed, sans-serif',
                                  fontWeight: 600,
                                  cssClass: 'apexcharts-yaxis-label',
                                },
                                formatter(value) {
                                  return `R$ ${(value / 1000000).toFixed(2)}M`;
                                },
                              },
                            },
                          },
                        },
                      ],
                      plotOptions: {
                        bar: {
                          horizontal: false,
                        },
                      },
                      yaxis: {
                        decimalsInFloat: 2,
                        title: {
                          text: 'Total de Remunerações',
                          offsetY: 10,
                          style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#263238',
                          },
                        },
                        labels: {
                          show: true,
                          minWidth: 0,
                          maxWidth: 160,
                          style: {
                            colors: [],
                            fontSize: '16px',
                            fontFamily: 'Roboto Condensed, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-yaxis-label',
                          },
                          formatter(value) {
                            if (value === 29000321)
                              return 'Não existem dados para esse mês';
                            return `R$ ${(value / 1000000).toFixed(2)}M`;
                          },
                        },
                      },
                      xaxis: {
                        categories: (() => {
                          const list = [];
                          for (const i in MONTHS) {
                            if (Number.isNaN(Number(i))) {
                              list.push(i);
                            }
                          }
                          return list;
                        })(),
                        title: {
                          text: 'Meses',
                          offsetX: 6,
                          style: {
                            fontSize: '15px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#263238',
                          },
                        },
                      },
                      legend: {
                        show: false,
                        position: 'right',
                        offsetY: 120,
                      },
                      fill: {
                        opacity: 1,
                        image: {
                          src: [
                            'https://catalogue.accasoftware.com/img/Prodotti/2920/PREVIEW/hachura-30.1.750x527-1_1563779607.PNG',
                          ],
                        },
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    }}
                    series={[
                      {
                        name: 'Benefícios',
                        data: (() => {
                          if (!hidingBenefits) {
                            return createArrayFilledWithValue(12, 0).map(
                              (v, i) => {
                                if (fixYearDataArray(data)[i]) {
                                  return (
                                    fixYearDataArray(data)[i].Perks +
                                    fixYearDataArray(data)[i].Others
                                  );
                                }
                                return v;
                              },
                            );
                          }
                          return createArrayFilledWithValue(12, 0);
                        })(),
                      },
                      {
                        name: 'Salário',
                        data: (() => {
                          if (!hidingWage) {
                            return createArrayFilledWithValue(
                              12,
                              0,
                            ).map((v, i) =>
                              fixYearDataArray(data)[i]
                                ? fixYearDataArray(data)[i].Wage
                                : v,
                            );
                          }
                          return createArrayFilledWithValue(12, 0);
                        })(),
                      },
                      {
                        name: 'Sem Dados',
                        data: (() => {
                          if (!hidingNoData) {
                            return createArrayFilledWithValue(12, 0).map(
                              (v, i) => {
                                if (fixYearDataArray(data)[i]) {
                                  return v;
                                }
                                // this verifcation is used to check the previous months without data based in the last month in array, if the month is previous then a existing data and has no data, the no data array is filled
                                if (i < data[data.length - 1].Month) {
                                  return MaxMonthPlaceholder;
                                }
                                return 0;
                              },
                            );
                          }
                          return createArrayFilledWithValue(12, 0);
                        })(),
                      },
                    ]}
                    width="100%"
                    height="500"
                    type="bar"
                  />
                </div>
              ) : (
                <ActivityIndicatorPlaceholder fontColor="#3e5363">
                  Não há dados para esse ano
                </ActivityIndicatorPlaceholder>
              )}
            </>
          )}
        </GraphDivWithPagination>
        <div className="buttons">
          <Button
            textColor="#3E5363"
            borderColor="#3E5363"
            backgroundColor="#fff"
            hoverBackgroundColor="#3E5363"
            onClick={() => exportChart()}
          >
            Compartilhar
            <img src="/img/icon_download_share.svg" alt="calendario" />
          </Button>
          <a href={`/orgao/${id}/${year}/${navigableMonth}`}>
            <Button
              textColor="#B361C6"
              borderColor="#B361C6"
              backgroundColor="#fff"
              hoverBackgroundColor="#B361C6"
            >
              Explorar Meses
              <img src="/img/icon_calendario.svg" alt="calendario" />
            </Button>
          </a>
        </div>
      </MainGraphSection>
    );
  }
  return generateGraphWithNavigation();
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { summary } = context.params;
  try {
    const { data } = await api.get(`/orgao/${summary}`);
    if (!data.Agency) {
      context.res.writeHead(301, {
        Location: `/404`,
      });
      context.res.end();
      return { props: {} };
    }
    return {
      props: {
        dataList: data.Agency,
        summary: data.Name,
      },
    };
  } catch (error) {
    context.res.writeHead(301, {
      Location: `/404`,
    });
    context.res.end();
    return { props: {} };
  }
};

const MainGraphSection = styled.section`
  padding: 5rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (min-width: 600px) {
    margin-left: 8rem;
    margin-right: 8rem;
  }
  margin-bottom: 4rem;
  text-align: center;
  background-color: #fff;
  font-size: 4rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  .buttons {
    justify-content: flex-end;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 600px) {
      justify-content: center;
      margin-bottom: 2rem;
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
const GraphDivWithPagination = styled.div`
  margin-top: 3rem;
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  color: #3e5363;
  background: rgba(62, 83, 99, 0.05);
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
        font-size: 400%;
        color: #fff;
        font-size: 2rem;
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
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
const Captions = styled.div`
  padding: 2rem;
  width: 50%;
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
          width: 600%;
          z-index: 100;
          padding: 2rem;
          font-size: 2rem;
          right: 0%;
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
      width: 3rem;
      margin: 0 1rem;
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
    justify-content: space-between;
  }
`;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  a {
    color: #3e5363;
    text-decoration: none;
    &:hover {
      h2 {
        text-decoration: underline #3e5363;
      }
    }
  }
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
    }
    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
`;
const CaptionItems = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  button {
    border: none;
    width: 65%;
    background: none;
  }
  button.active {
    opacity: 0.4;
    width: 65%;
  }
  img {
    width: 100%;
    background: #2c3236;
    border: solid 2px #3e5363;
  }
  span {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: #3e5363;
    & > * {
      font-size: 1.5rem;
    }
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
const Page = styled.div`
  background: #3e5363;
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
function createArrayFilledWithValue<T>(size: number, value: T): T[] {
  const array = [];
  for (let i = 0; i < size; i += 1) {
    array.push(value);
  }
  return array;
}
function fixYearDataArray(array: any[]) {
  const a = createArrayFilledWithValue(12, undefined);
  array.forEach(v => {
    a[v.Month - 1] = v;
  });
  return a;
}
