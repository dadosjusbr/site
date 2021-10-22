/* eslint-disable no-restricted-syntax */
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styled from 'styled-components';
import MONTHS from '../@types/MONTHS';
import ActivityIndicator from './ActivityIndicator';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface RemunerationBarGraphProps {
  year: number;
  data: any[];
  dataLoading: boolean;
  billion?: boolean;
}

const RemunerationBarGraph: React.FC<RemunerationBarGraphProps> = ({
  year,
  data,
  dataLoading,
  billion = false,
}) => {
  // this constant is used as an alx value to determine the max graph height
  const MaxMonthPlaceholder = 29000321;
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  return (
    <>
      <Captions>
        <div>
          <span>
            <h3>
              Total de Remunerações de Membros em {year}: R${' '}
              {(() => {
                // this function is used to sum the data from all money arrays and generate the last remuneration value
                let total = 0;
                const monthlyTotals = data.map(
                  d => d.BaseRemuneration + d.OtherRemunerations,
                );
                monthlyTotals.forEach(w => {
                  total += w;
                });
                // here we return the final value to millions showing 2 decimal places
                return !billion
                  ? `${(total / 1000000).toFixed(1)}M`
                  : `${(total / 1000000000).toFixed(1)}B`;
              })()}
            </h3>
          </span>
          <span className="info">
            <img src="/img/icon_info.svg" alt="informações" />
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
                alt="salário"
              />
            </button>
            <span>
              Salário:
              <br />
              <b>
                R${' '}
                {(() => {
                  let total = 0;
                  const wages = data.map(d => d.BaseRemuneration);
                  wages.forEach(w => {
                    total += w;
                  });
                  return !billion
                    ? `${(total / 1000000).toFixed(1)}M`
                    : `${(total / 1000000000).toFixed(1)}B`;
                })()}
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
                alt="benefícios"
              />
            </button>
            <span>
              Benefícios:
              <br />
              <b>
                R${' '}
                {(() => {
                  let total = 0;
                  const monthlyTotals = data.map(d => d.OtherRemunerations);
                  monthlyTotals.forEach(w => {
                    total += w;
                  });
                  return !billion
                    ? `${(total / 1000000).toFixed(1)}M`
                    : `${(total / 1000000000).toFixed(1)}B`;
                })()}
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
                alt="sem dados"
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
                    colors: ['#97BB2F', '#2FBB96', '#2c3236'],
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
                                return !billion
                                  ? `R$ ${(value / 1000000).toFixed(2)}M`
                                  : `R$ ${(value / 1000000000).toFixed(2)}B`;
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
                          return !billion
                            ? `R$ ${(value / 1000000).toFixed(2)}M`
                            : `R$ ${(value / 1000000000).toFixed(2)}B`;
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
                                return fixYearDataArray(data)[i]
                                  .OtherRemunerations;
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
                          return createArrayFilledWithValue(12, 0).map((v, i) =>
                            fixYearDataArray(data)[i]
                              ? fixYearDataArray(data)[i].BaseRemuneration
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
                              if (year === new Date().getFullYear()) {
                                if (i < data[data.length - 1].Month) {
                                  return MaxMonthPlaceholder;
                                }
                              } else {
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
    </>
  );
};

export default RemunerationBarGraph;

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
        font-size: 1.7rem;
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
    white-space: nowrap;
    & > * {
      font-size: 1.5rem;
    }
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
