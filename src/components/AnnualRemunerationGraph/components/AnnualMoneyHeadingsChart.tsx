import { Box, CircularProgress, ThemeProvider } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import light from '../../../styles/theme-light';
import { formatCurrencyValue } from '../../../functions/format';
import { createDataArray, yearList, noData } from '../functions';
import { graphAnnotations } from '../functions/graphConfigs';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
  const yearListArr = yearList();

  const colors = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    // '#6d2f4f',
    // '#d9d9d9',
    // '#bc80bd',
    '#2C3236',
  ];

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
                xaxis: graphAnnotations({ data, matches }),
              },
              tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                inverseOrder: true,
                enabledOnSeries: [0, 1, 2, 3, 4, 5, 6],
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
              {
                name: 'Outras',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'outras',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Licença-compensatória',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'licenca_compensatoria',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Gratificação natalina',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'gratificacao_natalina',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Indenização de férias',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'indenizacao_de_ferias',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Auxílio-alimentação',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'auxilio_alimentacao',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Licença-prêmio',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'licenca_premio',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Auxílio-saúde',
                data: (() =>
                  createDataArray({
                    tipoRemuneracao: 'auxilio_saude',
                    data,
                    type: 'rubrica',
                  }))(),
              },
              {
                name: 'Sem Dados',
                data: (() =>
                  noData({
                    data,
                    type: 'rubrica',
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

export default AnnualMoneyHeadingsChart;
