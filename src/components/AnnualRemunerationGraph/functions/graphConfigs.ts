import {
  createDataArray,
  getYearWithIncompleteData,
  noData,
  totalWaste,
  yearList,
} from '.';
import COLLECT_INFOS from '../../../@types/COLLECT_INFOS';
import { getCurrentYear } from '../../../functions/currentYear';
import { formatCurrencyValue } from '../../../functions/format';
import { useRemunerationDataTypes } from '../../../hooks/useRemunerationTypes';

const yearListArr = yearList();
const currentYear = getCurrentYear();

export const graphAnnotations = ({
  data,
  matches,
}: {
  data: AnnualSummaryData[];
  matches: boolean;
}): XAxisAnnotations[] => {
  const yearsArr = getYearWithIncompleteData(data).map(d =>
    d.ano === undefined ? 0 : d.ano,
  );

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
};

export const graphOptions = ({
  agency,
  data,
  matches,
  graphType,
}: {
  agency: Agency;
  data: AnnualSummaryData[];
  matches: boolean;
  graphType: string;
}): ApexCharts.ApexOptions => {
  const { baseRemunerationDataTypes, otherRemunerationsDataTypes } =
    useRemunerationDataTypes(graphType);

  function transformGrpahTitle() {
    if (baseRemunerationDataTypes === 'remuneracao_base_por_membro') {
      return 'Média de remuneração por membro';
    }
    if (baseRemunerationDataTypes === 'remuneracao_base_por_mes') {
      return 'Média de remuneração mensal';
    }
    return 'Total de Remunerações';
  }

  return {
    colors: [
      'transparent',
      'transparent',
      '#97BB2F',
      '#2FBB96',
      '#57659d',
      '#2c3236',
    ],
    chart: {
      id: 'remuneration-graph',
      stacked: true,
      toolbar: {
        offsetY: 475,
        tools: {
          download: '<Image src="/img/cloud_download_black_24dp.svg"></Image>',
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
            max:
              Math.max(
                ...totalWaste({
                  data,
                  baseRemunerationDataTypes,
                  otherRemunerationsDataTypes,
                }),
              ) * 1.1,
            forceNiceScale: true,
            decimalsInFloat: 2,
            title: {
              text: transformGrpahTitle(),
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
      max:
        Math.max(
          ...totalWaste({
            data,
            baseRemunerationDataTypes,
            otherRemunerationsDataTypes,
          }),
        ) * 1.1,
      forceNiceScale: true,
      decimalsInFloat: 2,
      title: {
        text: transformGrpahTitle(),
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
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      inverseOrder: true,
      enabledOnSeries: [0, 1, 2, 3, 4],
      marker: {
        fillColors: [
          '#e5cbb4',
          '#ec4b59',
          '#97BB2F',
          '#2FBB96',
          '#57659d',
          '#2c3236',
        ],
      },
      x: {
        formatter(val) {
          const date = new Date();
          const validMonths =
            yearListArr[val - 1] === currentYear &&
            date.getDate() > COLLECT_INFOS.COLLECT_DATE
              ? date.getMonth()
              : yearListArr[val - 1] === currentYear &&
                date.getDate() < COLLECT_INFOS.COLLECT_DATE
              ? date.getMonth() - 1
              : 12;
          const noDataMonths =
            validMonths -
            data.find(d => d.ano === yearListArr[val - 1])?.meses_com_dados;

          if (!data.map(d => d.ano).includes(yearListArr[val - 1])) {
            return `${yearListArr[val - 1]} (12 meses sem dados)`;
          }

          if (noDataMonths > 0) {
            return `${yearListArr[val - 1]} (${noDataMonths} ${
              noDataMonths > 1 ? 'meses' : 'mês'
            } sem dados)`;
          }

          if (
            getYearWithIncompleteData(data).filter(
              d => d.ano === yearListArr[val - 1],
            ).length === 0
          ) {
            return `${yearListArr[val - 1]}`;
          }

          return `${yearListArr[val - 1]}`;
        },
      },
      y: {
        formatter(val, opts) {
          if (
            opts.w.globals.seriesNames[opts.seriesIndex] ===
            'Média mensal de membros'
          ) {
            return `${val}`;
          }
          if (opts.w.globals.seriesNames[opts.seriesIndex] === 'Descontos') {
            if (val === undefined) {
              return `R$ 0,0`;
            }
            return `${formatCurrencyValue(val * 1000000000, 1)}`;
          }
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
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      colors: ['', '', '', '', '', '', '#57659d'],
    },
  };
};

export const graphSeries = ({
  data,
  graphType,
  hidingRemunerations,
  hidingBenefits,
  hidingWage,
  hidingNoData,
  matches,
}: {
  data: AnnualSummaryData[];
  graphType: string;
  hidingRemunerations: boolean;
  hidingBenefits: boolean;
  hidingWage: boolean;
  hidingNoData: boolean;
  matches: boolean;
}): ApexAxisChartSeries | ApexNonAxisChartSeries => {
  const {
    netRemunerationDataTypes,
    baseRemunerationDataTypes,
    otherRemunerationsDataTypes,
    discountsDataTypes,
  } = useRemunerationDataTypes(graphType);

  return [
    {
      type: 'bar',
      name: 'Média mensal de membros',
      data: (() =>
        createDataArray({
          tipoRemuneracao: 'num_membros' as keyof ItemSummary,
          data,
        }))(),
    },
    {
      type: 'bar',
      name: 'Descontos',
      data: createDataArray({
        tipoRemuneracao: discountsDataTypes as keyof ItemSummary,
        data,
      }).map(d => d / 1000000000),
    },
    {
      type: 'bar',
      name: 'Benefício bruto',
      data: (() => {
        if (!hidingBenefits) {
          return createDataArray({
            tipoRemuneracao: otherRemunerationsDataTypes as keyof ItemSummary,
            data,
          });
        }
        return [];
      })(),
      // @ts-expect-error this function always returns a string
      color: options =>
        getYearWithIncompleteData(data)
          .map(d => d[otherRemunerationsDataTypes])
          .includes(options.value) &&
        graphAnnotations({ data, matches })
          .map(d => d.x)
          .map(elemento => yearListArr.indexOf(+elemento))
          .includes(options.dataPointIndex)
          ? '#98bb2f7d'
          : '#97BB2F',
    },
    {
      type: 'bar',
      name: 'Salário bruto',
      data: (() => {
        if (!hidingWage) {
          return createDataArray({
            tipoRemuneracao: baseRemunerationDataTypes as keyof ItemSummary,
            data,
          });
        }
        return [];
      })(),
      // @ts-expect-error this function always returns a string
      color: options =>
        getYearWithIncompleteData(data)
          .map(d => d[baseRemunerationDataTypes])
          .includes(options.value) &&
        graphAnnotations({ data, matches })
          .map(d => d.x)
          .map(elemento => yearListArr.indexOf(+elemento))
          .includes(options.dataPointIndex)
          ? '#2fbb967d'
          : '#2FBB96',
    },
    {
      type: 'line',
      name: 'Remuneração líquida',
      data: (() => {
        if (!hidingRemunerations) {
          return createDataArray({
            tipoRemuneracao: netRemunerationDataTypes as keyof ItemSummary,
            data,
          });
        }
        return [];
      })(),
      color: '#57659d',
    },
    {
      type: 'bar',
      name: 'Sem Dados',
      data: (() => {
        if (!hidingNoData) {
          return noData({
            data,
            baseRemunerationDataTypes,
            otherRemunerationsDataTypes,
          });
        }
        return [];
      })(),
    },
  ];
};
