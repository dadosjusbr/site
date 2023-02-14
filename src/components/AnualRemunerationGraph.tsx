/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CrawlingDateTable from './CrawlingDateTable';
import NotCollecting from './NotCollecting';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalarioButton = styled(IconButton)({});
const BeneficiosButton = styled(IconButton)({});
const SemDadosButton = styled(IconButton)({});

export interface AnualRemunerationGraphProps {
  year: number;
  agency: any;
  data: any[];
  dataLoading: boolean;
  billion?: boolean;
  onYearChange?: (year: number) => void;
}

const AnualRemunerationGraph: React.FC<AnualRemunerationGraphProps> = ({
  year,
  agency,
  data,
  dataLoading = true,
  billion = false,
  onYearChange,
}) => {
  // this constant is used as an alx value to determine the max graph height
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [selectedYear, setSelectedYear] = useState(year);
  const [hidingErrors, setHidingErrors] = useState(false);
  const matches = useMediaQuery('(max-width:500px)');

  function createDataArray(tipoRemuneracao: string) {
    const a = data.map(d =>
      d[tipoRemuneracao] === undefined ? 0 : d[tipoRemuneracao],
    );
    return a;
  }

  function totalWaste() {
    const a = data.map(
      d =>
        (d.remuneracao_base === undefined ? 0 : d.remuneracao_base / 1000000) +
        (d.outras_remuneracoes === undefined
          ? 0
          : d.outras_remuneracoes / 1000000),
    );
    return a;
  }

  useEffect(() => {
    setSelectedYear(!dataLoading && data ? data.at(-1).ano : year);
  }, [dataLoading]);

  return (
    <>
      {agency && agency.coletando ? (
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
                Remunerações de membros entre{' '}
                {!dataLoading && data
                  ? `${data.at(0).ano} e ${data.at(-1).ano}`
                  : ''}
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
                    const wages = data.map(d =>
                      d.remuneracao_base === undefined ? 0 : d.remuneracao_base,
                    );
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
                    const monthlyTotals = data.map(d =>
                      d.outras_remuneracoes === undefined
                        ? 0
                        : d.outras_remuneracoes,
                    );
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
              <Typography variant="h6" textAlign="center">
                Total de remunerações de membros por ano
              </Typography>
              {agency && data && !dataLoading ? (
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Tooltip
                    arrow
                    title={
                      <Typography fontSize="0.8rem" mt={1}>
                        Selecione no gráfico o ano que deseja explorar.
                      </Typography>
                    }
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      endIcon={<ArrowForwardIosIcon />}
                      href={`/orgao/${agency.id_orgao}/${selectedYear}`}
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
                          ],
                          chart: {
                            events: {
                              click(__, _, config) {
                                if (config.dataPointIndex >= 0) {
                                  onYearChange(data[config.dataPointIndex].ano);
                                  setSelectedYear(
                                    data[config.dataPointIndex].ano,
                                  );
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
                                    ? `R$ ${val.toFixed(2)}M`
                                    : `R$ ${val.toFixed(2)}B`;
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
                              data.forEach(item => {
                                list.push(item.ano);
                              });
                              return list;
                            })(),
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
                            name: 'Membros',
                            data: (() => createDataArray('num_membros'))(),
                          },
                          {
                            name: 'Benefícios',
                            data: (() => {
                              if (!hidingBenefits) {
                                return createDataArray('outras_remuneracoes');
                              }
                              return [];
                            })(),
                          },
                          {
                            name: 'Salário',
                            data: (() => {
                              if (!hidingWage) {
                                return createDataArray('remuneracao_base');
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
            {data && data.length > 0 && (
              <Grid container display="flex" justifyContent="center">
                {console.log(data)}
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

export default AnualRemunerationGraph;
