/* eslint-disable no-restricted-syntax */
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  Alert,
  Box,
  Button,
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
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MONTHS from '../@types/MONTHS';
import CrawlingDateTable from './CrawlingDateTable';
import NotCollecting from './NotCollecting';
import { getCurrentYear } from '../functions/currentYear';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalarioButton = styled(IconButton)({});
const BeneficiosButton = styled(IconButton)({});
const SemDadosButton = styled(IconButton)({});

export interface RemunerationBarGraphProps {
  year: number;
  agency: any;
  data: any[];
  dataLoading: boolean;
  billion?: boolean;
  onMonthChange?: (month: number) => void;
  selectedMonth?: number;
}

const RemunerationBarGraph: React.FC<RemunerationBarGraphProps> = ({
  year,
  agency,
  data,
  dataLoading = true,
  billion = false,
  onMonthChange,
  selectedMonth,
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
      return found
        ? found.BaseRemuneration + found.OtherRemunerations + 1
        : 10000;
    }
    return 10000;
  }, [data]);
  const MonthlyInfo = useMemo(() => {
    let object = {};
    if (data) {
      data.forEach(element => {
        object = {
          ...object,
          [MONTHS[element.Month]]:
            element.BaseRemuneration + element.OtherRemunerations,
        };
      });
    }
    return object;
  }, [data]);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [hidingErrors, setHidingErrors] = useState(false);
  const matches = useMediaQuery('(max-width:500px)');
  return (
    <>
      {agency && agency.collecting ? (
        <NotCollecting agency={agency} />
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{
              ...(matches && {
                paddingBottom: 4,
              }),
            }}
          >
            <Box py={4} textAlign="center" padding={4}>
              <Typography
                variant="h5"
                {...(matches && { variant: 'h6' })}
                textAlign="center"
              >
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
                        <b>Membros:</b> Participantes ativos do órgao, incluindo
                        os servidores públicos, os militares e os membros do
                        Poder Judiciário.
                      </p>
                      <p>
                        <b>Servidor:</b> Funcionário público que exerce cargo ou
                        função pública, com vínculo empregatício, e que recebe
                        remuneração fixa ou variável.
                      </p>
                      <p>
                        <b>Salário:</b> Valor recebido de acordo com a prestação
                        de serviços, em decorrência do contrato de trabalho.
                      </p>
                      <p>
                        <b>Benefícios:</b> Qualquer remuneração recebida por um
                        funcionário que não seja proveniente de salário.
                        Exemplos de benefícios são: diárias, gratificações,
                        remuneração por função de confiança, benefícios pessoais
                        ou eventuais, auxílios alimentação, saúde, escolar...
                      </p>
                      <p>
                        <b>Sem dados:</b> Quando um órgão não disponibiliza os
                        dados de um determinado mês
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
            <Grid
              pb={8}
              container
              spacing={8}
              justifyContent="center"
              {...(matches && {
                justifyContent: 'space-evenly',
                pb: 0,
                rowSpacing: 4,
              })}
            >
              <Grid item textAlign="center">
                <SalarioButton
                  sx={{ backgroundColor: '#2fbb95' }}
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
                  Salário:
                  {matches ? <br /> : ' '}
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
                </Typography>

                {matches ? (
                  <>
                    <SemDadosButton
                      sx={{ mt: 2, backgroundColor: '#3E5363' }}
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
                  </>
                ) : null}
              </Grid>
              <Grid item textAlign="center">
                <BeneficiosButton
                  sx={{ backgroundColor: '#96bb2f' }}
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
                  Benefícios:
                  {matches ? <br /> : ' '}
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
                </Typography>
              </Grid>
              {!matches ? (
                <>
                  <Grid item textAlign="center">
                    <SemDadosButton
                      sx={{ backgroundColor: '#3E5363' }}
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
                </>
              ) : null}
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
            <Box my={4} pt={2} padding={4}>
              {agency != null && data.length < 12 && data.length > 0 ? (
                <Box display="flex" justifyContent="center">
                  <Alert
                    severity="warning"
                    variant="outlined"
                    sx={{
                      alignItems: 'center',
                      width: 'fit-content',
                    }}
                  >
                    Este órgão conta com{' '}
                    {(() => {
                      const months = [];
                      for (let i = 1; i <= 12; i += 1) {
                        if (year === getCurrentYear()) {
                          if (
                            !data.find(d => d.Month === i) &&
                            i <= new Date().getMonth()
                          ) {
                            months.push(i);
                          }
                        } else if (!data.find(d => d.Month === i)) {
                          months.push(i);
                        }
                      }
                      return `${months.length} ${
                        months.length > 1 ? 'meses' : 'mês'
                      }`;
                    })()}{' '}
                    onde seus dados não foram publicados.
                  </Alert>
                </Box>
              ) : null}
              <Typography mt={2} variant="h6" textAlign="center">
                Total de remunerações de membros por mês em {year}
              </Typography>
              {agency && data.length > 0 && !dataLoading ? (
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Tooltip
                    arrow
                    title={
                      <Typography fontSize="0.8rem" mt={1}>
                        Selecione no gráfico o mês que deseja explorar.
                      </Typography>
                    }
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      endIcon={<ArrowForwardIosIcon />}
                      href={`/orgao/${agency.aid}/${year}/${selectedMonth}`}
                    >
                      EXPLORAR
                    </Button>
                  </Tooltip>
                </Grid>
              ) : null}
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
                    <Box pr={2}>
                      <Chart
                        options={{
                          colors: [
                            'trasnparent',
                            'trasnparent',
                            '#97BB2F',
                            '#2FBB96',
                            '#2c3236',
                            '#ffab00',
                          ],
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
                              offsetY: 480,
                              tools: {
                                download:
                                  '<Image src="/img/cloud_download_black_24dp.svg"></Image>',
                              },
                              show: true,
                              export: {
                                svg: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.aid}` : ''
                                  }-${year}`,
                                },
                                png: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.aid}` : ''
                                  }-${year}`,
                                },
                                csv: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.aid}` : ''
                                  }-${year}`,
                                },
                              },
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
                                  width: '110%',
                                },
                                yaxis: {
                                  decimalsInFloat: 2,
                                  title: {
                                    text: 'Total de Remunerações',
                                    offsetY: 10,
                                    style: {
                                      fontSize: '10px',
                                      fontWeight: 'bold',
                                      color: '#091216',
                                    },
                                  },
                                  labels: {
                                    show: true,
                                    minWidth: 0,
                                    maxWidth: 70,
                                    style: {
                                      colors: [],
                                      fontSize: '0.7rem',
                                      fontFamily:
                                        'Roboto Condensed, sans-serif',
                                      fontWeight: 600,
                                      cssClass: 'apexcharts-yaxis-label',
                                    },
                                    formatter(value) {
                                      return !billion
                                        ? `R$ ${(value / 1000000).toFixed(2)}M`
                                        : `R$ ${(value / 1000000000).toFixed(
                                            2,
                                          )}B`;
                                    },
                                  },
                                },
                                xaxis: {
                                  labels: {
                                    rotate: -60,
                                    style: {
                                      fontSize: '12px',
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
                              offsetX: -5.5,
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
                                fontSize: '11px',
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

                          tooltip: {
                            enabled: true,
                            shared: true,
                            intersect: false,
                            inverseOrder: true,
                            ...(agency != null
                              ? { enabledOnSeries: [0, 1, 2, 3] }
                              : { enabledOnSeries: [0, 2, 3] }),
                            x: {
                              formatter(val) {
                                if (MonthlyInfo[val] === undefined) {
                                  return 'Sem Dados';
                                }
                                return `${val}`;
                              },
                            },
                            y: {
                              formatter(val, opts) {
                                if (
                                  opts.w.globals.seriesNames[
                                    opts.seriesIndex
                                  ] === 'Membros'
                                ) {
                                  return `${val}`;
                                }
                                if (
                                  opts.w.globals.seriesNames[
                                    opts.seriesIndex
                                  ] === 'Total de remunerações'
                                ) {
                                  return !billion
                                    ? `R$ ${(val * 10).toFixed(2)}M`
                                    : `R$ ${(val / 100).toFixed(2)}B`;
                                }
                                return !billion
                                  ? `R$ ${(val / 1000000).toFixed(2)}M`
                                  : `R$ ${(val / 1000000000).toFixed(2)}B`;
                              },
                            },
                          },
                          xaxis: {
                            crosshairs: {
                              show: false,
                              width: 1,
                            },
                            labels: {
                              style: {
                                fontSize: '12px',
                              },
                            },
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
                              offsetX: -25,
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
                            name: 'Total de remunerações',
                            data: (() =>
                              createArrayFilledWithValue(12, 0).map((v, i) =>
                                fixYearDataArray(data)[i]
                                  ? fixYearDataArray(data)[i].BaseRemuneration /
                                      10000000 +
                                    fixYearDataArray(data)[i]
                                      .OtherRemunerations /
                                      10000000
                                  : v,
                              ))(),
                          },
                          {
                            name: 'Membros',
                            data: (() =>
                              createArrayFilledWithValue(12, 0).map((v, i) =>
                                fixYearDataArray(data)[i]
                                  ? fixYearDataArray(data)[i].TotalMembers
                                  : v,
                              ))(),
                          },
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
                                    const dateFixedArray = fixYearDataArray(
                                      data,
                                    );
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
                    <Typography variant="body1" mt={2} textAlign="center">
                      Não há dados para esse ano.
                    </Typography>
                  )}
                </>
              )}
            </Box>
            {data && data.length > 0 && (
              <Grid container display="flex" justifyContent="center">
                <Grid
                  display="flex"
                  item
                  pb={4}
                  sx={{ width: '50%' }}
                  justifyContent="center"
                  flexDirection="row"
                >
                  <CrawlingDateTable data={data} dataLoading={dataLoading} />
                </Grid>
              </Grid>
            )}
          </Paper>
        </>
      )}
    </>
  );
};

export default RemunerationBarGraph;

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
