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
  width,
  height,
}: {
  data: v2MonthTotals[];
  year: number;
  width?: number | string;
  height?: number | string;
}) => {
  const MaxMonthPlaceholder = () =>
    data
      .map(d => d.resumo_rubricas.outras)
      .reduce((a, b) => {
        if (a > b) {
          return a;
        }
        return b;
      }, 0);

  const OthersMoneyHeadings = createArrayFilledWithValue({
    size: 12,
    value: 0,
  }).map((v, i) => {
    if (fixYearDataArray(data)[i]) {
      return fixYearDataArray(data)[i].resumo_rubricas.outras;
    }
    return v;
  });

  return (
    <ThemeProvider theme={light}>
      <Box mt={4}>
        <Suspense fallback={<CircularProgress />}>
          <Chart
            options={{
              colors: [
                '#8dd3c7',
                '#ffffb3',
                '#bebada',
                '#fb8072',
                '#80b1d3',
                '#fdb462',
                // '#b3de69',
                // '#6d2f4f',
                // '#d9d9d9',
                // '#bc80bd',
                '#2C3236',
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
                        text: 'Gasto mensal',
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
                  text: 'Gasto mensal',
                  offsetY: 10,
                  offsetX: 6,
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
                enabledOnSeries: [0, 1, 2, 3, 4, 5],
                x: {
                  formatter(val, opts) {
                    if (OthersMoneyHeadings[opts.dataPointIndex] === 0) {
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
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) => {
                      if (fixYearDataArray(data)[i]) {
                        return fixYearDataArray(data)[i].resumo_rubricas.outras;
                      }
                      return v;
                    },
                  ))(),
              },
              {
                name: 'Licença compensatória',
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .licenca_compensatoria
                        : v,
                  ))(),
              },
              {
                name: 'Gratificação natalina',
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .gratificacao_natalina
                        : v,
                  ))(),
              },
              {
                name: 'Indenização de férias',
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .indenizacao_de_ferias
                        : v,
                  ))(),
              },
              {
                name: 'Auxílio alimentação',
                data: (() =>
                  createArrayFilledWithValue({ size: 12, value: 0 }).map(
                    (v, i) =>
                      fixYearDataArray(data)[i]
                        ? fixYearDataArray(data)[i].resumo_rubricas
                            .auxilio_alimentacao
                        : v,
                  ))(),
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
                data: (() =>
                  createArrayFilledWithValue({
                    size: 12,
                    value: 0,
                  }).map((v, i) => {
                    const dateFixedArray = fixYearDataArray(data);
                    if (dateFixedArray[i]) {
                      return v;
                    }
                    // this verifcation is used to check the previous months without data based in the last month in array,
                    // if the month is previous then a existing data and has no data, the no data array is filled
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
                  }))(),
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
