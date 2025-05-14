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
import { yearList, noData, fillNoDataIndexes } from '../functions';
import { graphAnnotations } from '../functions/graphConfigs';
import { useUniqueColors } from '../../../hooks/useUniqueColors';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const yearListArr = yearList();

const rub = (data: AnnualSummaryData[]) => {
  type GraphSeries = {
    name: string;
    data: number[];
    color?: string;
  };

  // Sort years without mutating original array
  const sortedData = [...data].sort((a, b) => a.ano - b.ano);
  const seriesMap = new Map<string, GraphSeries>();

  // Single pass through the data
  sortedData.forEach((yearData, yearIndex) => {
    for (const [name, value] of Object.entries(yearData.resumo_rubricas)) {
      if (!seriesMap.has(name) && value > 0) {
        seriesMap.set(name, {
          name: capitalize(name).replace(/_/g, ' '),
          data: new Array(data.length).fill(0),
          ...(name === 'outras' && { color: '#D1D1D17D' }),
        });
      }

      if (seriesMap.has(name)) {
        const entry = seriesMap.get(name);
        entry.data[yearIndex] = value;
      }
    }
  });

  // Optimize array conversion and sorting in single pass
  const series: GraphSeries[] = Array.from(seriesMap.entries())
    .sort(([nameA], [nameB]) => {
      // Put "outras" at the end
      if (nameA.toLowerCase() === 'outras') return 1;
      if (nameB.toLowerCase() === 'outras') return -1;
      // Sort alphabetically otherwise
      return nameA.localeCompare(nameB);
    })
    .map(([, entry]) => {
      // Handle the case where there is no data for a year
      entry.data = fillNoDataIndexes(sortedData, entry.data);
      return entry;
    });

  return series.reverse();
};

const AnnualMoneyHeadingsChart = ({
  data,
  yearsWithoutData,
  width,
  height,
  matches,
}: {
  data: AnnualSummaryData[];
  yearsWithoutData: number[];
  width?: number | string;
  height?: number | string;
  matches: boolean;
}) => {
  const rubs = rub(data);
  const colors = useUniqueColors(rubs.length);
  const noDataArray = noData({ data });

  const MaxYearPlaceholder = useMemo(() => {
    if (!rubs.length) return 0;

    const maxRubrica = rubs.reduce(
      (max, current) => {
        const total = current.data.reduce((sum, val) => sum + val, 0);
        return total > max.total ? { total, data: current.data } : max;
      },
      { total: 0, data: [] },
    );

    return maxRubrica.total;
  }, [rubs]);

  return (
    <ThemeProvider theme={light}>
      <Box mt={4}>
        <Suspense fallback={<CircularProgress aria-label="Carregando dados" />}>
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
                        text: 'Gasto anual',
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
                  text: 'Gasto anual',
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
              annotations: {
                xaxis: graphAnnotations({ data, matches, agencyInfo: null }),
              },
              tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                inverseOrder: true,
                enabledOnSeries: [...Array(rubs.length)].map((_, i) => i),
                marker: {
                  fillColors: colors,
                },
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
                categories: yearListArr,
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
              ...rubs,
              {
                name: 'Sem Dados',
                data: noDataArray.map(d =>
                  d === null ? MaxYearPlaceholder : d,
                ),
                color: '#2C3236',
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

export default AnnualMoneyHeadingsChart;
