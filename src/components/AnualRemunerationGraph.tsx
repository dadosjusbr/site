/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CrawlingDateTable from './CrawlingDateTable';
import NotCollecting from './NotCollecting';
import { getCurrentYear } from '../functions/currentYear';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
  const [selectedYear, setSelectedYear] = useState(year);
  const yearList = () => {
    let list = [];
    for (let i = 2018; i <= getCurrentYear(); i++) {
      list.push(i);
    }
    return list;
  };
  const yearsWithData = data.map(d => d.ano).sort((a, b) => a - b);

  const noData = () => {
    let noData = [];

    for (let i = 2018; i <= getCurrentYear(); i++) {
      if (yearsWithData.includes(i)) {
        noData.push(0);
      } else if (!yearsWithData.includes(i)) {
        noData.push(MaxMonthPlaceholder);
      }
    }
    return noData;
  };

  const totalWaste = () => {
    const a = data.map(
      d =>
        (d.remuneracao_base === undefined ? 0 : d.remuneracao_base / 1000000) +
        (d.outras_remuneracoes === undefined
          ? 0
          : d.outras_remuneracoes / 1000000),
    );
    let dataArray = [];

    for (let i = 2018; i <= getCurrentYear(); i++) {
      if (yearsWithData.includes(i)) {
        dataArray.push(a[yearsWithData.indexOf(i)]);
      } else if (!yearsWithData.includes(i)) {
        dataArray.push(0);
      }
    }

    return dataArray;
  };

  const createDataArray = (tipoRemuneracao: string) => {
    const incomingData = data.map(d =>
      d[tipoRemuneracao] === undefined ? 0 : d[tipoRemuneracao],
    );
    let dataArray = [];

    for (let i = 2018; i <= getCurrentYear(); i++) {
      if (yearsWithData.includes(i)) {
        dataArray.push(incomingData[yearsWithData.indexOf(i)]);
      } else if (!yearsWithData.includes(i)) {
        dataArray.push(0);
      }
    }

    return dataArray;
  };

  const MaxMonthPlaceholder = useMemo(() => {
    if (data) {
      const max = data
        .sort(
          (a, b) =>
            a.remuneracao_base +
            a.outras_remuneracoes -
            (b.remuneracao_base + b.outras_remuneracoes),
        )
        .reverse()[0];

      return max ? max.remuneracao_base + max.outras_remuneracoes + 1 : 10000;
    }
    return 10000;
  }, [data]);

  useEffect(() => {
    setSelectedYear(!dataLoading && data ? data.at(-1).ano : year);
  }, [dataLoading]);

  return (
    <>
      {agency && agency.coletando ? (
        <NotCollecting agency={agency} />
      ) : (
        <>
          <Paper elevation={0}>
            <Box pt={2} padding={4}>
              <Typography variant="h5" textAlign="center">
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
                            'transparent',
                            'transparent',
                            '#97BB2F',
                            '#2FBB96',
                            '#2c3236',
                          ],
                          chart: {
                            events: {
                              click(__, _, config) {
                                if (config.dataPointIndex >= 0) {
                                  onYearChange(
                                    yearList()[config.dataPointIndex],
                                  );
                                  setSelectedYear(
                                    yearList()[config.dataPointIndex],
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
                            enabledOnSeries: [0, 1, 2, 3],
                            x: {
                              formatter(val) {
                                if (!data.map(d => d.ano).includes(val)) {
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
                              return yearList();
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
                            name: 'Média mensal de membros',
                            data: (() => createDataArray('num_membros'))(),
                          },
                          {
                            name: 'Benefícios',
                            data: (() => {
                              return createDataArray('outras_remuneracoes');
                            })(),
                          },
                          {
                            name: 'Salário',
                            data: (() => {
                              return createDataArray('remuneracao_base');
                            })(),
                          },
                          {
                            name: 'Sem Dados',
                            data: (() => {
                              return noData();
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

export default AnualRemunerationGraph;
