/* eslint-disable no-restricted-syntax */
import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Tooltip,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import NotCollecting from './NotCollecting';
import AlertModal from './AlertModal';
import { getCurrentYear } from '../functions/currentYear';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalarioButton = styled(IconButton)({});
const BeneficiosButton = styled(IconButton)({});
const SemDadosButton = styled(IconButton)({});

export interface AnualRemunerationGraphProps {
  year: number;
  agency: any;
  data: any[];
  dataLoading: boolean;
}

const AnualRemunerationGraph: React.FC<AnualRemunerationGraphProps> = ({
  year,
  agency,
  data,
  dataLoading = true,
}) => {
  const matches = useMediaQuery('(max-width:500px)');
  const [hidingWage, setHidingWage] = React.useState(false);
  const [hidingBenefits, setHidingBenefits] = React.useState(false);
  const [hidingNoData, setHidingNoData] = React.useState(false);
  const [graphType, setGraphType] = React.useState('media-por-membro');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateValue = (value: number, decimal_places = 1): string => {
    if (value.toFixed(0).toString().length > 9) {
      return `R$ ${(value / 1000000000).toFixed(decimal_places)}B`;
    }
    if (value.toFixed(0).toString().length > 6) {
      return `R$ ${(value / 1000000).toFixed(decimal_places)}M`;
    }
    if (value.toFixed(0).toString().length > 3) {
      return `R$ ${(value / 1000).toFixed(decimal_places)} mil`;
    }
    return `R$ ${value.toFixed(0)}`;
  };

  const baseRemunerationDataTypes = React.useMemo(() => {
    if (graphType === 'media-por-membro') {
      return 'remuneracao_base_por_membro';
    }
    if (graphType === 'media-mensal') {
      return 'remuneracao_base_por_mes';
    }
    return 'remuneracao_base';
  }, [graphType]);

  const otherRemunerationsDataTypes = React.useMemo(() => {
    if (graphType === 'media-por-membro') {
      return 'outras_remuneracoes_por_membro';
    }
    if (graphType === 'media-mensal') {
      return 'outras_remuneracoes_por_mes';
    }
    return 'outras_remuneracoes';
  }, [graphType]);

  const yearList = () => {
    const list = [];
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      list.push(i);
    }
    return list;
  };

  const yearsWithData = React.useMemo(() => {
    if (data) {
      return data.map(d => d.ano).sort((a, b) => a - b);
    }
    return [];
  }, [data]);

  const yearsWithoutData = React.useMemo(() => {
    if (yearsWithData) {
      return yearList().filter(
        returnedYear => !yearsWithData.includes(returnedYear),
      );
    }
    return [];
  }, [data]);

  const incompleteDataValues = (tipoRemuneracao: string) => {
    const arr = data
      .filter(d => d.meses_com_dados < 12)
      .map(d => d[tipoRemuneracao]);

    return arr;
  };

  const monthsWithoutData = React.useMemo(() => {
    let monthsWithoutDataArr = 0;
    if (data) {
      data
        .map(d => {
          if (d.ano === getCurrentYear()) {
            if (
              new Date() < new Date(getCurrentYear(), new Date().getMonth(), 17)
            ) {
              return new Date().getMonth() - (d.meses_com_dados + 1);
            }
            return new Date().getMonth() - d.meses_com_dados;
          }
          return 12 - d.meses_com_dados;
        })
        .forEach(d => {
          monthsWithoutDataArr += d;
        });
      return monthsWithoutDataArr;
    }
    return monthsWithoutDataArr;
  }, [data]);

  const noData = () => {
    const noDataArr = [];
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      if (yearsWithData.includes(i)) {
        noDataArr.push(0);
      } else if (!yearsWithData.includes(i)) {
        noDataArr.push(MaxMonthPlaceholder);
      }
    }
    return noDataArr;
  };

  const totalWaste = () => {
    const totalRemunerationArr = data
      .sort((a, b) => a.ano - b.ano)
      .map(
        d =>
          (d[baseRemunerationDataTypes] === undefined
            ? 0
            : d[baseRemunerationDataTypes] / 1000000) +
          (d[otherRemunerationsDataTypes] === undefined
            ? 0
            : d[otherRemunerationsDataTypes] / 1000000),
      );

    const dataArray = [];
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      if (yearsWithData.includes(i)) {
        dataArray.push(totalRemunerationArr[yearsWithData.indexOf(i)]);
      } else if (!yearsWithData.includes(i)) {
        dataArray.push(0);
      }
    }

    return dataArray;
  };

  const createDataArray = (tipoRemuneracao: string) => {
    const incomingData = data
      .sort((a, b) => a.ano - b.ano)
      .map(d => (d[tipoRemuneracao] === undefined ? 0 : d[tipoRemuneracao]));

    const dataArray = [];
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      if (yearsWithData.includes(i)) {
        dataArray.push(incomingData[yearsWithData.indexOf(i)]);
      } else if (!yearsWithData.includes(i)) {
        dataArray.push(0);
      }
    }

    return dataArray;
  };

  const graphAnnotations = React.useMemo(() => {
    if (data) {
      const yearsArr = data
        .sort((a, b) => a.ano - b.ano)
        .filter(d => d.meses_com_dados < 12)
        .map(d => (d.ano === undefined ? 0 : d.ano));

      const annotationsLabel: AnnotationLabel = {
        borderColor: '#f2ca4b',
        text: 'Dados incompletos',
        orientation: 'vertical',
        position: 'bottom',
        textAnchor: matches ? 'middle' : 'end',
        offsetY: -6,
        offsetX: 6,
        style: {
          color: '#000',
          background: '#f2ce5c',
          fontFamily: 'Roboto Condensed',
          fontSize: '12px',
        },
      };

      return yearsArr.map(d => ({
        x: d,
        label: annotationsLabel,
        borderWidth: 0,
      }));
    }
    return [];
  }, [data, matches]);

  // this constant is used as an alx value to determine the max graph height
  const MaxMonthPlaceholder = React.useMemo(() => {
    if (data) {
      const max = data
        .sort(
          (a, b) =>
            a[baseRemunerationDataTypes] +
            a[otherRemunerationsDataTypes] -
            (b[baseRemunerationDataTypes] + b[otherRemunerationsDataTypes]),
        )
        .reverse()[0];

      return max
        ? max[baseRemunerationDataTypes] + max[otherRemunerationsDataTypes] + 1
        : 10000;
    }
    return 10000;
  }, [data, baseRemunerationDataTypes, otherRemunerationsDataTypes]);

  const warningMessage = () => {
    if (noData().find(d => d !== 0)) {
      return `Este órgão não publicou dados de ${yearsWithoutData.length}
      ${yearsWithoutData.length > 1 ? 'anos' : 'ano'}${
        monthsWithoutData > 0 ? ` e ${monthsWithoutData}` : '.'
      }
      ${
        monthsWithoutData > 1 ? 'meses.' : monthsWithoutData === 1 ? 'mês.' : ''
      }`;
    }
    if (monthsWithoutData > 0 && !noData().find(d => d !== 0)) {
      return `Este órgão não publicou dados de ${monthsWithoutData}
        ${
          monthsWithoutData > 1
            ? 'meses.'
            : monthsWithoutData === 1
            ? 'mês.'
            : ''
        }`;
    }
    return '';
  };

  return (
    <>
      {agency && agency.coletando && !data ? (
        <NotCollecting agency={agency} />
      ) : (
        <>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <Box sx={{ maxWidth: { xs: 320, sm: 720 }, marginBottom: 2 }}>
                {!dataLoading &&
                (yearsWithoutData.length > 0 || monthsWithoutData > 0) ? (
                  <Box mt={2} display="flex" justifyContent="center">
                    <AlertModal
                      agencyData={agency}
                      openParam={open}
                      handleClose={handleClose}
                      handleOpen={handleOpen}
                    >
                      {warningMessage()}
                    </AlertModal>
                  </Box>
                ) : null}
                <Tabs
                  value={graphType}
                  onChange={(event: React.SyntheticEvent, newValue: any) =>
                    setGraphType(newValue)
                  }
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="Opções de gráfico"
                  sx={{ my: 2 }}
                >
                  <Tab value="media-por-membro" label="Média por membro" />
                  <Tab value="media-mensal" label="Média mensal" />
                  <Tab value="total" label="Total de remunerações" />
                </Tabs>
              </Box>
              <Typography variant="h5">
                {graphType === 'media-por-membro' &&
                  'Em média, cada membro deste órgão recebe: '}
                {graphType === 'media-mensal' &&
                  'Em média, este órgão gasta todos os meses: '}
                {graphType === 'total' && 'Total de gastos deste órgão: '}
                {(() => {
                  // this function is used to sum the data from all money arrays and generate the last remuneration value
                  let total = 0;
                  const yearlyTotals = data.map(
                    d =>
                      d[baseRemunerationDataTypes] +
                      d[otherRemunerationsDataTypes],
                  );

                  yearlyTotals.forEach(w => {
                    total += w;
                  });

                  if (graphType === 'total') {
                    return calculateValue(total);
                  }

                  return calculateValue(total / data.length);
                })()}
                <Tooltip
                  placement="top"
                  title={
                    <Typography fontSize="0.8rem">
                      <p>
                        <b>Membros:</b> Participantes ativos do órgão, incluindo
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
              container
              pt={4}
              maxWidth={615}
              margin="auto"
              justifyContent="space-between"
            >
              <Grid xs={5} md={3} item textAlign="center">
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
                  Salário:{' '}
                  {(() => {
                    let total = 0;
                    const yearlyTotals = data.map(
                      d => d[baseRemunerationDataTypes],
                    );

                    yearlyTotals.forEach(w => {
                      total += w;
                    });

                    return calculateValue(total);
                  })()}
                </Typography>
              </Grid>
              <Grid xs={5} md={3} item textAlign="center">
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
                  Benefícios:{' '}
                  {(() => {
                    let total = 0;
                    const yearlyTotals = data.map(
                      d => d[otherRemunerationsDataTypes],
                    );

                    yearlyTotals.forEach(w => {
                      total += w;
                    });

                    return calculateValue(total);
                  })()}
                </Typography>
              </Grid>
              <Grid xs={5} md={3} item textAlign="center">
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
            </Grid>
            <Box px={4}>
              {agency && data && !dataLoading ? (
                <Grid display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowForwardIosIcon />}
                    href={`/orgao/${agency.id_orgao}/${year}`}
                  >
                    EXPLORAR
                  </Button>
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
                            'transparent',
                            'transparent',
                            '#97BB2F',
                            '#2FBB96',
                            '#2c3236',
                          ],
                          chart: {
                            id: 'remuneration-graph',
                            stacked: true,
                            toolbar: {
                              offsetY: 475,
                              tools: {
                                download:
                                  '<Image src="/img/cloud_download_black_24dp.svg"></Image>',
                              },
                              show: true,
                              export: {
                                svg: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.id_orgao}` : ''
                                  }`,
                                },
                                png: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.id_orgao}` : ''
                                  }`,
                                },
                                csv: {
                                  filename: `remuneracoes-membros${
                                    agency ? `- ${agency.id_orgao}` : ''
                                  }`,
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
                                  height: '400',
                                  toolbar: {
                                    offsetY: 370,
                                  },
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
                                    formatter(value: number) {
                                      return `${calculateValue(value, 0)}`;
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
                              offsetX: -5,
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
                                return `${calculateValue(value)}`;
                              },
                            },
                          },
                          annotations: {
                            xaxis: graphAnnotations,
                          },
                          tooltip: {
                            enabled: true,
                            shared: true,
                            intersect: false,
                            inverseOrder: true,
                            enabledOnSeries: [0, 1, 2, 3],
                            marker: {
                              fillColors: [
                                'transparent',
                                'transparent',
                                '#2FBB96',
                                '#97BB2F',
                                '#2c3236',
                              ],
                            },
                            x: {
                              formatter(val) {
                                const noDataMonths =
                                  12 -
                                  (data.find(d => d.ano === val) &&
                                    data.find(d => d.ano === val)
                                      .meses_com_dados);

                                if (!data.map(d => d.ano).includes(val)) {
                                  return `${val} (12 meses sem dados)`;
                                }

                                if (noDataMonths === 0) {
                                  return `${val}`;
                                }

                                return `${val} (${noDataMonths} ${
                                  noDataMonths > 1 ? 'meses' : 'mês'
                                } sem dados)`;
                              },
                            },
                            y: {
                              formatter(val, opts) {
                                if (
                                  opts.w.globals.seriesNames[
                                    opts.seriesIndex
                                  ] === 'Média mensal de membros'
                                ) {
                                  return `${val}`;
                                }
                                if (
                                  opts.w.globals.seriesNames[
                                    opts.seriesIndex
                                  ] === 'Total de remunerações'
                                ) {
                                  if (val === undefined) {
                                    return `R$ 0.00M`;
                                  }
                                  return `${calculateValue(val * 1000000, 2)}`;
                                }
                                return `${calculateValue(val, 2)}`;
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
                            categories: (() => yearList())(),
                            title: {
                              text: 'Anos',
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
                            data: (() => totalWaste())(),
                          },
                          {
                            name: 'Média mensal de membros',
                            data: (() => createDataArray('num_membros'))(),
                          },
                          {
                            name: 'Benefícios',
                            data: (() => {
                              if (!hidingBenefits) {
                                return createDataArray(
                                  otherRemunerationsDataTypes,
                                );
                              }
                              return [];
                            })(),
                            // @ts-expect-error this function always returns a string
                            color: ({ value }) =>
                              incompleteDataValues(
                                otherRemunerationsDataTypes,
                              ).includes(value)
                                ? '#98bb2f7d'
                                : '#97BB2F',
                          },
                          {
                            name: 'Salário',
                            data: (() => {
                              if (!hidingWage) {
                                return createDataArray(
                                  baseRemunerationDataTypes,
                                );
                              }
                              return [];
                            })(),
                            // @ts-expect-error this function always returns a string
                            color: ({ value }) =>
                              incompleteDataValues(
                                baseRemunerationDataTypes,
                              ).includes(value)
                                ? '#2fbb967d'
                                : '#2FBB96',
                          },
                          {
                            name: 'Sem Dados',
                            data: (() => {
                              if (!hidingNoData) {
                                return noData();
                              }
                              return [];
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
          </Paper>
        </>
      )}
    </>
  );
};

export default AnualRemunerationGraph;
