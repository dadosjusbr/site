import {
  Box,
  capitalize,
  CircularProgress,
  ThemeProvider,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import light from '../../../styles/theme-light';
import { formatCurrencyValue } from '../../../functions/format';
import { getCurrentYear } from '../../../functions/currentYear';
import MONTHS from '../../../@types/MONTHS';
import { createArrayFilledWithValue, fixYearDataArray } from '../functions';
import COLLECT_INFOS from '../../../@types/COLLECT_INFOS';
import { useUniqueColors } from '../../../hooks/useUniqueColors';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const currentYear = getCurrentYear();
const MONTHLY_ARRAY_FILLED_WITH_ZERO = createArrayFilledWithValue({
  size: 12,
  value: 0,
});

const rub = (data: v2MonthTotals[]) => {
  type GraphSeries = {
    name: string;
    data: number[];
    color?: string;
  };

  const seriesMap = new Map<string, GraphSeries>();

  // Single pass through the data to discover and fill items
  data.forEach((monthData, monthIndex) => {
    if (monthData) {
      Object.entries(monthData.resumo_rubricas).forEach(([key, value]) => {
        if (!seriesMap.has(key) && value > 0) {
          // Initialize new series when we find a new heading
          seriesMap.set(key, {
            name: capitalize(key).replace(/_/g, ' '),
            data: [...MONTHLY_ARRAY_FILLED_WITH_ZERO],
            ...(key === 'outras' && { color: '#D1D1D17D' }),
          });
        }

        if (seriesMap.has(key)) {
          const entry = seriesMap.get(key);
          entry.data[monthIndex] = value;
        }
      });
    }
  });

  // Convert to array and ensure 'outras' comes first
  const series: GraphSeries[] = Array.from(seriesMap.entries())
    .sort(([nameA], [nameB]) => {
      // Put "outras" at the end
      if (nameA.toLowerCase() === 'outras') return 1;
      if (nameB.toLowerCase() === 'outras') return -1;
      // Sort alphabetically otherwise
      return nameA.localeCompare(nameB);
    })
    .map(([, entry]) => entry);

  return series.reverse();
};

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
  // `data` has to be fixed to ensure all months are present before passing to rub()
  // This is important to ensure that the chart is always filled with 12 months
  const fixedData = fixYearDataArray(data);
  const rubs = rub(fixedData);
  const colors = useUniqueColors(rubs.length);
  // Add a color for 'Sem Dados' series
  colors.push('#2C3236');

  const MaxMonthPlaceholder = useMemo(() => {
    if (!rubs.length) return 0;

    const maxRubrica = rubs.reduce((acc, rubrica) => {
      const maxValue = Math.max(...rubrica.data);
      return Math.max(acc, maxValue);
    }, 0);

    return maxRubrica;
  }, [rubs]);

  const monthsWithoutData = MONTHLY_ARRAY_FILLED_WITH_ZERO.map(
    (_, monthIndex) => {
      // If we have data for this month, return 0
      if (fixedData[monthIndex]) {
        return 0;
      }

      // For past years, all missing months should show as empty
      if (year < currentYear) {
        return MaxMonthPlaceholder;
      }

      // For current year, only show empty months up to current date
      const collectDate = new Date(
        currentYear,
        monthIndex + 1,
        COLLECT_INFOS.COLLECT_DATE,
      );
      const now = new Date();

      return collectDate < now ? MaxMonthPlaceholder : 0;
    },
  );

  return (
    <ThemeProvider theme={light}>
      <Box mt={4}>
        <Suspense fallback={<CircularProgress />}>
          <Chart
            options={{
              colors,
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
                enabledOnSeries: [
                  ...Array.from({ length: rubs.length }, (_, i) => i),
                ],
                x: {
                  formatter(val, opts) {
                    if (monthsWithoutData[opts.dataPointIndex] !== 0) {
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
                  text: 'Meses',
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
              ...rubs,
              {
                type: 'bar',
                name: 'Sem Dados',
                data: monthsWithoutData,
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
