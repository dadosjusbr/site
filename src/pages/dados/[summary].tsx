import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactFrappeChart from 'react-frappe-charts';
import Link from 'next/link';
import ActivityIndicator from '../../components/ActivityIndicator';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import STATE_AGENCIES from '../../@types/STATE_AGENCIES';

export default function SummaryPage({ summary }) {
  const router = useRouter();
  function handleNavigateBetweenSummaryOptions(option: string) {
    router.push(`/dados/${option}`);
  }
  async function fetchSummaryData() {
    try {
      const { data } = await api.get(`/orgao/${summary}`);
      setDataList(data.Agency ? data.Agency : []);
      setSummaryLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [dataList, setDataList] = useState<any[]>([]);
  useEffect(() => {
    fetchSummaryData();
  }, [summary]);

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
      <SelectContainer>
        <SumarySelectorComboBox
          value={summary}
          onChange={a => {
            handleNavigateBetweenSummaryOptions(a.target.value);
          }}
        >
          <optgroup label="Órgãos Federais" />
          <optgroup label="Órgãos Estaduais">
            {(() => {
              const list = [];
              for (const i in STATE_AGENCIES) {
                list.push(i);
              }
              return list.map(i => (
                <option key={STATE_AGENCIES[i]} value={STATE_AGENCIES[i]}>
                  {formatToAgency(i)}
                </option>
              ));
            })()}
          </optgroup>
        </SumarySelectorComboBox>
      </SelectContainer>
      <div>
        {(() => {
          if (summaryLoading) {
            return (
              <ActivityIndicatorPlaceholder>
                <ActivityIndicator spinnerColor="#FFF" />
                <span>Carregando dados...</span>
              </ActivityIndicatorPlaceholder>
            );
          }
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
  useEffect(() => {
    setDataLoading(true);
    fetchAgencyData();
  }, [year]);
  async function fetchAgencyData() {
    try {
      const { data: agency } = await api.get(`/orgao/totais/${id}/${year}`);
      setData(agency.MonthTotals ? agency.MonthTotals : []);
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
          <h2>
            {title} ({id.toLocaleUpperCase('pt')})
          </h2>
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
                  let cont = 0;
                  const benefits = data.map(d => d.Perks + d.Others + d.Wage);
                  benefits.forEach(w => {
                    cont += w;
                  });
                  return (cont / 1000000).toFixed(2);
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
                    let cont = 0;
                    const wages = data.map(d => d.Wage);
                    wages.forEach(w => {
                      cont += w;
                    });
                    return (cont / 1000000).toFixed(2);
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
                    let cont = 0;
                    const benefits = data.map(d => d.Perks + d.Others);
                    benefits.forEach(w => {
                      cont += w;
                    });
                    return (cont / 1000000).toFixed(2);
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
                  <ReactFrappeChart
                    ref={chartRef}
                    {...{
                      data: {
                        labels: [
                          'Jan',
                          'Fev',
                          'Mar',
                          'Abr',
                          'Mai',
                          'Jun',
                          'Jul',
                          'Ago',
                          'Set',
                          'Out',
                          'Nov',
                          'Dez',
                        ],
                        datasets: [
                          {
                            name: 'Benefícios',
                            chartType: 'bar',
                            values:
                              !hidingBenefits &&
                              createArrayFilledWithValue(12, 0).map((v, i) =>
                                fixYearDataArray(data)[i]
                                  ? (fixYearDataArray(data)[i].Perks +
                                    fixYearDataArray(data)[i].Others) /
                                  1000000
                                  : v,
                              ),
                          },
                          {
                            name: 'Salário',
                            chartType: 'bar',
                            values:
                              !hidingWage &&
                              createArrayFilledWithValue(12, 0).map((v, i) =>
                                fixYearDataArray(data)[i]
                                  ? fixYearDataArray(data)[i].Wage / 1000000
                                  : v,
                              ),
                          },
                          {
                            name: 'Sem Dados',
                            chartType: 'bar',
                            values:
                              !hidingNoData &&
                              createArrayFilledWithValue(12, 0).map((v, i) =>
                                fixYearDataArray(data)[i] ? v : 20,
                              ),
                          },
                        ],
                      },

                      type: 'bar', // or 'bar', 'line', 'pie', 'percentage'
                      height: 300,
                      axisOptions: {
                        xAxisMode: 'tick',
                      },
                      colors: ['#97BB2F', '#3EDBB1', '#2c3236'],
                      barOptions: {
                        stacked: 1,
                        spaceRatio: 0.6,
                      },
                      tooltipOptions: {
                        formatTooltipX: d => `${d}`.toUpperCase(),
                        formatTooltipY: d => `R$ ${d.toFixed(2)} M`,
                      },
                    }}
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
  const summary = context.params;
  return {
    props: summary,
  };
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
        font-size: 290%;
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
const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
  justify-content: center;
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
const SumarySelectorComboBox = styled.select`
  padding: 3rem 2rem;
  border-radius: 5px;
  width: 30%;
  min-width: 25rem;
  border: solid 2px #fff;
  background: #3e5363
    url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='5'><path fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")
    no-repeat right 3rem center/8px 10px;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  color: #fff;
  font-weight: bold;
  transition: border 0.2 ease;
  appearance: none;
  option {
    font-size: 2rem;
  }
  optgroup {
    font-size: 2rem;
  }
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &:focus {
    border: 2px solid #3f51b5;
  }
  &:focus-visible {
    border: 2px solid #3f51b5;
  }
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
function formatToAgency(agency: string) {
  const sub = agency.split('_');
  const formatedSubs = sub.map(s => {
    const a = s.toLowerCase();
    const newString = a.split('');
    newString[0] = a[0].toLocaleUpperCase();
    return newString.join('');
  });
  const a = formatedSubs.join(' ');
  return a;
}
