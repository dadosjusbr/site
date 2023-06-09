import { formatCurrencyValue } from '../../../functions/format';
import MONTHS from '../../../@types/MONTHS';
import { getCurrentYear } from '../../../functions/currentYear';
import {
  MaxMonthPlaceholder,
  MonthlyInfo,
  createArrayFilledWithValue,
  fixYearDataArray,
} from '.';
import COLLECT_INFOS from '../../../@types/COLLECT_INFOS';

export const graphOptions = ({
  agency,
  data,
  year,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  agency: Agency;
  data: v2MonthTotals[];
  year: number;
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}): ApexCharts.ApexOptions => ({
  colors: [
    'transparent',
    'transparent',
    '#97BB2F',
    '#2FBB96',
    '#2c3236',
    '#ffab00',
  ],
  chart: {
    stacked: true,
    toolbar: {
      offsetY: 480,
      tools: {
        download:
          '<Image src="/img/cloud_download_black_24dp.svg" width="24px" height="24px" alt="Download Icon"></Image>',
      },
      show: true,
      export: {
        svg: {
          filename: `remuneracoes-membros${
            agency ? `- ${agency.id_orgao}` : ''
          }-${year}`,
        },
        png: {
          filename: `remuneracoes-membros${
            agency ? `- ${agency.id_orgao}` : ''
          }-${year}`,
        },
        csv: {
          filename: `remuneracoes-membros${
            agency ? `- ${agency.id_orgao}` : ''
          }-${year}`,
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
              return formatCurrencyValue(value);
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
        if (
          value ===
          MaxMonthPlaceholder({
            data,
            baseRemunerationDataTypes,
            otherRemunerationsDataTypes,
          })
        )
          return 'Não existem dados para esse mês';
        return formatCurrencyValue(value);
      },
    },
  },

  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    inverseOrder: true,
    ...(agency != null
      ? { enabledOnSeries: [0, 1, 2, 3] }
      : { enabledOnSeries: [0, 2, 3] }),
    x: {
      formatter(val) {
        if (
          MonthlyInfo({
            data,
            baseRemunerationDataTypes,
            otherRemunerationsDataTypes,
          })[val] === undefined
        ) {
          return 'Sem Dados';
        }
        return `${val}`;
      },
    },
    y: {
      formatter(val, opts) {
        if (opts.w.globals.seriesNames[opts.seriesIndex] === 'Membros') {
          return `${val}`;
        }
        if (
          opts.w.globals.seriesNames[opts.seriesIndex] ===
          'Total de remunerações'
        ) {
          return formatCurrencyValue(val * 10000000);
        }
        return formatCurrencyValue(val);
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
  year,
  hidingBenefits,
  hidingWage,
  hidingErrors,
  hidingNoData,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: v2MonthTotals[];
  year: number;
  hidingBenefits: boolean;
  hidingWage: boolean;
  hidingErrors: boolean;
  hidingNoData: boolean;
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}): ApexAxisChartSeries | ApexNonAxisChartSeries => [
  {
    name: 'Total de remunerações',
    data: (() =>
      createArrayFilledWithValue({ size: 12, value: 0 }).map((v, i) =>
        fixYearDataArray(data)[i]
          ? fixYearDataArray(data)[i][baseRemunerationDataTypes] / 10000000 +
            fixYearDataArray(data)[i][otherRemunerationsDataTypes] / 10000000
          : v,
      ))(),
  },
  {
    name: 'Membros',
    data: (() =>
      createArrayFilledWithValue({ size: 12, value: 0 }).map((v, i) =>
        fixYearDataArray(data)[i] ? fixYearDataArray(data)[i].total_membros : v,
      ))(),
  },
  {
    name: 'Benefícios',
    data: (() => {
      if (!hidingBenefits) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map(
          (v, i) => {
            if (fixYearDataArray(data)[i]) {
              return fixYearDataArray(data)[i][otherRemunerationsDataTypes];
            }
            return v;
          },
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
  },
  {
    name: 'Salário',
    data: (() => {
      if (!hidingWage) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map((v, i) =>
          fixYearDataArray(data)[i]
            ? fixYearDataArray(data)[i][baseRemunerationDataTypes]
            : v,
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
  },
  {
    name: 'Sem Dados',
    data: (() => {
      if (!hidingNoData) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map(
          (v, i) => {
            const dateFixedArray = fixYearDataArray(data);
            if (dateFixedArray[i]) {
              return v;
            }
            // this verifcation is used to check the previous months without data based in the last month in array, if the month is previous then a existing data and has no data, the no data array is filled
            const date = new Date();
            if (year === getCurrentYear()) {
              if (
                new Date(getCurrentYear(), i + 1, COLLECT_INFOS.COLLECT_DATE) <
                date
              ) {
                return MaxMonthPlaceholder({
                  data,
                  baseRemunerationDataTypes,
                  otherRemunerationsDataTypes,
                });
              }
            } else {
              return MaxMonthPlaceholder({
                data,
                baseRemunerationDataTypes,
                otherRemunerationsDataTypes,
              });
            }
            return 0;
          },
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
  },
  {
    name: 'Problema na coleta',
    data: (() => {
      if (!hidingErrors) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map(
          (v, i) => {
            // fills the chart data if theres an error in given month
            if (fixYearDataArray(data)[i] && fixYearDataArray(data)[i].error) {
              return MaxMonthPlaceholder({
                data,
                baseRemunerationDataTypes,
                otherRemunerationsDataTypes,
              });
            }
            return 0;
          },
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
  },
];
