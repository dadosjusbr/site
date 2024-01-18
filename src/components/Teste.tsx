import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import light from '../styles/theme-light';
import { formatCurrencyValue } from '../functions/format';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const data = [
  {
    ano: 2019,
    resumo_rubricas: {
      auxilio_alimentacao: 137904,
      outras: 15556174.26,
    },
  },
];

const Test = () => {
  return (
    <ThemeProvider theme={light}>
      <Box px={8}>
        <Suspense fallback={<CircularProgress />}>
          <Chart
            options={{
              colors: ['#ff1d1d', '#57659d'],
              chart: {
                id: 'remuneration-graph',
                stacked: true,
                toolbar: {
                  offsetY: 475,
                  tools: {
                    download:
                      '<Image src="/img/cloud_download_black_24dp.svg"></Image>',
                  },
                  show: false,
                },
                zoom: {
                  enabled: false,
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
                      height: '400',
                      toolbar: {
                        offsetY: 370,
                      },
                    },
                    yaxis: {
                      forceNiceScale: true,
                      decimalsInFloat: 2,
                      title: {
                        text: 'Quantidade',
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
                          fontFamily: 'Roboto Condensed, sans-serif',
                          fontWeight: 600,
                          cssClass: 'apexcharts-yaxis-label',
                        },
                        formatter(value: number) {
                          return `${formatCurrencyValue(value)}`;
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
                forceNiceScale: true,
                decimalsInFloat: 2,
                title: {
                  text: 'Quantidade',
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
                    return `${formatCurrencyValue(value)}`;
                  },
                },
              },
              // annotations: {
              //   xaxis: graphAnnotations({ data, matches }),
              // },
              markers: {
                size: 5,
                hover: {
                  size: 7,
                },
              },
              tooltip: {
                enabled: true,
                x: {
                  formatter(val) {
                    return `${val}`;
                  },
                },
                y: {
                  formatter(val, opts) {
                    return `${formatCurrencyValue(val, 1)}`;
                  },
                },
              },
              xaxis: {
                crosshairs: {
                  show: false,
                },
                labels: {
                  style: {
                    fontSize: '12px',
                  },
                },
                categories: ['2023'],
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
                tooltip: {
                  enabled: false,
                },
              },
              legend: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
            }}
            series={[
              {
                name: 'Outras',
                data: [data[0].resumo_rubricas.outras],
              },
              {
                name: 'Auxílio alimentação',
                data: [data[0].resumo_rubricas.auxilio_alimentacao],
              },
            ]}
            width="200"
            height="300"
            type="bar"
          />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
};

export default Test;
