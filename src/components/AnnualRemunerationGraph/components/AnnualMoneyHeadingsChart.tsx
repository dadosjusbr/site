import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import light from '../../../styles/theme-light';
import { formatCurrencyValue } from '../../../functions/format';
import { getCurrentYear } from '../../../functions/currentYear';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AnnualMoneyHeadingsChart = ({
  data,
  yearsWithoutData,
  width,
  height,
}: {
  data: AnnualSummaryData[];
  yearsWithoutData: number[];
  width?: number | string;
  height?: number | string;
}) => {
  const yearList = (): number[] => {
    const list = [];
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      list.push(i);
    }
    return list;
  };

  const transformedData = yearList().map(ano => {
    if (data.find(item => item.ano === ano)) {
      let rubricas = data.find(item => item.ano === ano).resumo_rubricas;
      rubricas['sem_dados'] = 0;
      return {
        ano,
        resumo_rubricas: rubricas,
      };
    }
    return {
      ano,
      resumo_rubricas: {
        sem_dados: data.map(item => item.resumo_rubricas)[0].outras,
      },
    };
  });

  const result = useMemo(() => {
    let groupedObject = {};

    transformedData.forEach(item => {
      Object.keys(item.resumo_rubricas).forEach(key => {
        if (!groupedObject[key]) {
          groupedObject[key] = [];
        }
        groupedObject[key].push(item.resumo_rubricas[key]);
      });
    });

    let result = Object.keys(groupedObject).map(key => {
      return {
        name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
        data: groupedObject[key],
      };
    });

    let index = result.findIndex(item => item.name === 'Outras');
    let item = result.splice(index, 1)[0];
    result.unshift(item);

    // Create bars to represent years with no data
    let noDataIndexes = transformedData
      .map((item, index) => {
        if (item.resumo_rubricas['sem_dados'] > 0) {
          return index;
        }
      })
      .filter(item => item !== undefined);

    noDataIndexes.forEach(index => {
      result.forEach(item => {
        item.name !== 'Sem dados' ? item.data.splice(index, 0, 0) : null;
      });
    });

    return result;
  }, [data]);

  return (
    <ThemeProvider theme={light}>
      <Box>
        <Suspense fallback={<CircularProgress />}>
          <Chart
            options={{
              colors: [
                '#70A9DB',
                '#8F3232',
                '#1dff7b',
                '#8176DB',
                '#FFC107',
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
                      filename: 'benefícios-membros-svg',
                    },
                    png: {
                      filename: 'benefícios-membros-png',
                    },
                    csv: {
                      filename: 'benefícios-membros-csv',
                    },
                  },
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
                        text: 'Gasto anual em benefícios',
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
                  text: 'Gasto anual em benefícios',
                  offsetY: 10,
                  offsetX: -3,
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
              tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                inverseOrder: true,
                x: {
                  formatter(val) {
                    if (yearsWithoutData.includes(val)) {
                      return `Sem dados`;
                    }
                    return `${val}`;
                  },
                },
                y: {
                  formatter(val) {
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
                categories: yearList(),
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
            series={result}
            width={width}
            height={height}
            type="bar"
          />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
};

export default AnnualMoneyHeadingsChart;
