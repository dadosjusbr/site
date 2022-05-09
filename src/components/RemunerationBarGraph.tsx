/* eslint-disable no-restricted-syntax */
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CropSquareIcon from '@mui/icons-material/CropSquare';

import MONTHS from '../@types/MONTHS';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalarioButton = styled(IconButton)({
  backgroundColor: '#2fbb95',
});
const BeneficiosButton = styled(IconButton)({
  backgroundColor: '#96bb2f',
});
const SemDadosButton = styled(IconButton)({
  backgroundColor: '#3E5363',
});

export interface RemunerationBarGraphProps {
  year: number;
  data: any[];
  dataLoading: boolean;
  billion?: boolean;
  onMonthChange?: (month: number) => void;
}

const RemunerationBarGraph: React.FC<RemunerationBarGraphProps> = ({
  year,
  data,
  dataLoading = true,
  billion = false,
  onMonthChange,
}) => {
  // this constant is used as an alx value to determine the max graph height
  const MaxMonthPlaceholder = useMemo(() => {
    if (data) {
      // first we sorts the array to get the max chart size (using the sum of BaseRemuneration and OtherRemunerations), and return the max value if it exists
      const found = data
        .filter(d => !d.Error)
        .sort(
          (a, b) =>
            a.BaseRemuneration +
            a.OtherRemunerations -
            (b.BaseRemuneration + b.OtherRemunerations),
        )
        .reverse()[0];
      // 10000 is used here as the min value of chart height
      return found ? found.BaseRemuneration + found.OtherRemunerations : 10000;
    }
    return 10000;
  }, [data]);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [hidingErrors, setHidingErrors] = useState(false);
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Paper elevation={0}>
        <Box pt={4} py={4} textAlign="center">
          <Typography variant="h5" textAlign="center">
            Total de remunerações de membros em {year}: R${' '}
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
            <Tooltip
              placement="top"
              title={
                <Typography fontSize="0.8rem">
                  <p>
                    <b>Salário:</b> valor recebido de acordo com a prestação de
                    serviços, em decorrência do contrato de trabalho.
                  </p>
                  <p>
                    <b>Benefícios:</b> Qualquer remuneração recebida por um
                    funcionário que não seja proveniente de salário. Exemplos de
                    benefícios são: diárias, gratificações, remuneração por
                    função de confiança, benefícios pessoais ou eventuais,
                    auxílios alimentação, saúde, escolar...
                  </p>
                  <p>
                    <b>Sem dados:</b> Quando um órgão não disponibiliza os dados
                    de um determinado mês
                  </p>
                  {/* <p>
                  <b>Problemas na coleta:</b> Quando existe um problema na coleta
                  de um determinado mês
                </p> */}
                </Typography>
              }
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
        <Grid pb={4} container spacing={2} justifyContent="center">
          <Grid item textAlign="center">
            <SalarioButton
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
              <AccountBalanceWalletIcon />
            </SalarioButton>
            <Typography pt={1}>
              Salário: R${' '}
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
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <BeneficiosButton
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
              <CardGiftcardIcon />
            </BeneficiosButton>
            <Typography pt={1}>
              Benefícios: R${' '}
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
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <SemDadosButton
              onClick={e => {
                if (hidingNoData) {
                  e.currentTarget.classList.remove('active');
                  setHidingNoData(false);
                } else {
                  e.currentTarget.classList.add('active');
                  setHidingNoData(true);
                }
              }}
            >
              <CropSquareIcon />
            </SemDadosButton>
            <Typography pt={1}>Sem dados</Typography>
          </Grid>
          {/* <Grid item textAlign="center">
          <IconButton
            onClick={e => {
              if (hidingErrors) {
                e.currentTarget.classList.remove('active');
                setHidingErrors(false);
              } else {
                e.currentTarget.classList.add('active');
                setHidingErrors(true);
              }
            }}
          >
            <SquareIcon />
          </IconButton>
          <Typography>Problemas na coleta</Typography>
        </Grid> */}
        </Grid>
      </Paper>
      <Paper elevation={0}>
        <Box my={4} pt={2}>
          <Typography variant="h6" textAlign="center">
            Total de remunerações de membros por mês em {year}
          </Typography>
          {dataLoading ? (
            <Box
              m={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div>
                <CircularProgress color="info" />
              </div>
              <p>Aguarde...</p>
            </Box>
          ) : (
            <>
              {data.length > 0 ? (
                <Box ml={4} mr={2}>
                  <Chart
                    options={{
                      colors: ['#97BB2F', '#2FBB96', '#2c3236', '#ffab00'],
                      chart: {
                        events: {
                          click(__, _, config) {
                            if (config.dataPointIndex >= 0) {
                              onMonthChange(config.dataPointIndex + 1);
                            }
                          },
                        },
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
                            color: '#091216',
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
                            if (value === MaxMonthPlaceholder)
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
                            return createArrayFilledWithValue(
                              12,
                              0,
                            ).map((v, i) =>
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
                                const dateFixedArray = fixYearDataArray(data);
                                if (dateFixedArray[i]) {
                                  return v;
                                }
                                // this verifcation is used to check the previous months without data based in the last month in array, if the month is previous then a existing data and has no data, the no data array is filled
                                const date = new Date();
                                if (year === date.getFullYear()) {
                                  if (i < date.getMonth()) {
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
                      {
                        name: 'Problema na coleta',
                        data: (() => {
                          if (!hidingErrors) {
                            return createArrayFilledWithValue(12, 0).map(
                              (v, i) => {
                                // fills the chart data if theres an error in given month
                                if (
                                  fixYearDataArray(data)[i] &&
                                  fixYearDataArray(data)[i].Error
                                ) {
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
                </Box>
              ) : (
                <div>Não há dados para esse ano</div>
              )}
            </>
          )}
        </Box>
      </Paper>
      {/* </ThemeProvider> */}
    </>
  );
};

export default RemunerationBarGraph;

// const Captions = styled.div`
//   padding: 2rem;
//   width: 50%;
//   min-width: 35rem;
//   justify-content: center;
//   color: #3e5363;
//   background: rgba(62, 83, 99, 0.05);
//   div {
//     padding: 0 1rem;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     span {
//       &.info {
//         position: relative;
//         div {
//           background-color: #ced9e1;
//           color: #3e5363;
//           width: 600%;
//           z-index: 100;
//           padding: 2rem;
//           font-size: 2rem;
//           right: 0%;
//           text-align: left;
//           b {
//             font-size: 1.5rem;
//           }
//           display: none;
//           position: absolute;
//         }
//         &:hover {
//           div {
//             display: block;
//           }
//         }
//       }
//       h3 {
//         text-align: center;
//         font-size: 1.7rem;
//       }
//     }
//     img {
//       background-color: #3e5363;
//       border-radius: 50%;
//       width: 3rem;
//       margin: 0 1rem;
//     }
//     align-items: center;
//   }
//   ul {
//     list-style: none;
//     margin-top: 3rem;
//     border-top: 1px solid #3e5363;
//     padding: 1rem 1rem;
//     padding-top: 2rem;
//     display: flex;
//     transition: all 1s ease;
//     justify-content: space-between;
//   }
// `;
// const CaptionItems = styled.li`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 20%;
//   button {
//     border: none;
//     width: 65%;
//     background: none;
//   }
//   button.active {
//     opacity: 0.4;
//     width: 65%;
//   }
//   img {
//     width: 100%;
//     background: #2c3236;
//     border: solid 2px #3e5363;
//   }
//   span {
//     margin-top: 1rem;
//     font-size: 1.5rem;
//     color: #3e5363;
//     & > * {
//       font-size: 1.5rem;
//     }
//     font-family: 'Roboto Condensed', sans-serif;
//   }
// `;
// const GraphDivWithPagination = styled.div`
//   margin-top: 3rem;
//   display: flex;
//   align-self: center;
//   justify-content: center;
//   flex-direction: column;
//   width: 100%;
//   color: #3e5363;
//   background: rgba(62, 83, 99, 0.05);
//   h3 {
//     padding: 1.5rem;
//   }
//   .main-chart-wrapper {
//     width: 100%;
//     div {
//       & > * {
//         font-size: 125%;
//       }
//       text {
//         font-family: 'Roboto Condensed', sans-serif;
//         font-size: 400%;
//         color: #fff;
//         font-size: 2rem;
//         @media (max-width: 600px) {
//           font-size: 1.5rem;
//         }
//         font-weight: bold;
//         &.title {
//           font-size: 120%;
//         }
//       }
//     }
//     padding-bottom: 1rem;
//     border-bottom: 2px solid #3e5363;
//   }
//   margin-bottom: 3rem;
// `;
// const ActivityIndicatorPlaceholder = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   padding: 20rem 0;
//   span {
//     margin-top: 3rem;
//   }
//   font-family: 'Roboto Condensed', sans-serif;
//   color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
//   font-size: 3rem;
//   align-items: center;
// `;
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
