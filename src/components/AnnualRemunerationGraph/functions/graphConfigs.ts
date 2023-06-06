import {
  createDataArray,
  getYearWithIncompleteData,
  noData,
  totalWaste,
  yearList,
} from '.';
import { formatCurrencyValue } from '../../../functions/format';

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
}: {
  agency: Agency;
  data: AnnualSummaryData[];
  matches: boolean;
}): ApexCharts.ApexOptions => ({
  colors: ['transparent', 'transparent', '#97BB2F', '#2FBB96', '#2c3236'],
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
          width: '100%',
          height: '400',
          toolbar: {
            offsetY: 370,
          },
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
    decimalsInFloat: 2,
    title: {
      text: 'Total de Remunerações',
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
  annotations: {
    xaxis: graphAnnotations({ data, matches }),
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    inverseOrder: true,
    enabledOnSeries: [0, 1, 2, 3],
    marker: {
      fillColors: [
        'transparent',
        'transparent',
        '#97BB2F',
        '#2FBB96',
        '#2c3236',
      ],
    },
    x: {
      formatter(val) {
        const noDataMonths =
          12 -
          (data.find(d => d.ano === val) &&
            data.find(d => d.ano === val).meses_com_dados);

        if (!data.map(d => d.ano).includes(val)) {
          return `${val} (12 meses sem dados)`;
        }

        if (noDataMonths === 0) {
          return `${val}`;
        }

        return `${val} (${noDataMonths} ${
          noDataMonths > 1 ? 'meses' : 'mês'
        } sem dados)`;
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
        if (
          opts.w.globals.seriesNames[opts.seriesIndex] ===
          'Total de remunerações'
        ) {
          if (val === undefined) {
            return `R$ 0.00M`;
          }
          return `${formatCurrencyValue(val * 1000000)}`;
        }
        return `${formatCurrencyValue(val)}`;
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
  },
  legend: {
    show: false,
    position: 'right',
    offsetY: 120,
  },
  dataLabels: {
    enabled: false,
  },
});

export const graphSeries = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
  hidingBenefits,
  hidingWage,
  hidingNoData,
  matches,
}: {
  data: AnnualSummaryData[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
  hidingBenefits: boolean;
  hidingWage: boolean;
  hidingNoData: boolean;
  matches: boolean;
}): ApexAxisChartSeries | ApexNonAxisChartSeries => [
  {
    name: 'Total de remunerações',
    data: (() =>
      totalWaste({
        data,
        baseRemunerationDataTypes,
        otherRemunerationsDataTypes,
      }))(),
  },
  {
    name: 'Média mensal de membros',
    data: (() => createDataArray({ tipoRemuneracao: 'num_membros', data }))(),
  },
  {
    name: 'Benefícios',
    data: (() => {
      if (!hidingBenefits) {
        return createDataArray({
          tipoRemuneracao: otherRemunerationsDataTypes,
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
        .map(elemento => yearList().indexOf(+elemento))
        .includes(options.dataPointIndex)
        ? '#98bb2f7d'
        : '#97BB2F',
  },
  {
    name: 'Salário',
    data: (() => {
      if (!hidingWage) {
        return createDataArray({
          tipoRemuneracao: baseRemunerationDataTypes,
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
        .map(elemento => yearList().indexOf(+elemento))
        .includes(options.dataPointIndex)
        ? '#2fbb967d'
        : '#2FBB96',
  },
  {
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
