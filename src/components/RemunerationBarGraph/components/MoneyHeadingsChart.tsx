import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import light from '../../../styles/theme-light';
import { formatCurrencyValue } from '../../../functions/format';
import { getCurrentYear } from '../../../functions/currentYear';
import MONTHS from '../../../@types/MONTHS';
import { createArrayFilledWithValue, fixYearDataArray } from '../functions';
import COLLECT_INFOS from '../../../@types/COLLECT_INFOS';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MoneyHeadingsChart = ({
  data,
  year,
  hidingNoData,
  // yearsWithoutData,
  width,
  height,
}: {
  data: v2MonthTotals[];
  year: number;
  hidingNoData: boolean;
  // yearsWithoutData: number[];
  width?: number | string;
  height?: number | string;
}) => {
  const MaxMonthPlaceholder = () => {
    return data
      .map(d => d.resumo_rubricas.outras)
      .reduce((a, b) => {
        if (a > b) {
          return a;
        } else {
          return b;
        }
      }, 0);
  };

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
                data: (() => {
                  return createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) => {
                      if (fixYearDataArray(data)[i]) {
                        return fixYearDataArray(data)[i].resumo_rubricas.outras;
                      }
                      return v;
                    },
                  );
                })(),
              },
              {
                name: 'Auxílio alimentação',
                data: (() => {
                  return createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .auxilio_alimentacao
                        : v,
                  );
                })(),
              },
              {
                name: 'Licença-prêmio',
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .licenca_premio
                        : v,
                  ))(),
              },
              {
                type: 'bar',
                name: 'Sem Dados',
                data: (() => {
                  if (!hidingNoData) {
                    return createArrayFilledWithValue({
                      size: 12,
                      value: 0,
                    }).map((v, i) => {
                      const dateFixedArray = fixYearDataArray(data);
                      if (dateFixedArray[i]) {
                        return v;
                      }
                      // this verifcation is used to check the previous months without data based in the last month in array, if the month is previous then a existing data and has no data, the no data array is filled
                      const date = new Date();
                      if (year === getCurrentYear()) {
                        if (
                          new Date(
                            getCurrentYear(),
                            i + 1,
                            COLLECT_INFOS.COLLECT_DATE,
                          ) < date
                        ) {
                          return MaxMonthPlaceholder();
                        }
                      } else {
                        return MaxMonthPlaceholder();
                      }
                      return 0;
                    });
                  }
                  return createArrayFilledWithValue({ size: 12, value: 0 });
                })(),
              },
            ]}
            width={width}
            height={height}
            type="bar"
          />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
};

export default MoneyHeadingsChart;
