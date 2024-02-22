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
}): ApexCharts.ApexOptions => {
  const MonthlyInfoArr = MonthlyInfo({
    data,
    baseRemunerationDataTypes,
    otherRemunerationsDataTypes,
  });

  const RemunerationArr = Object.keys(
    MonthlyInfo({
      data,
      baseRemunerationDataTypes,
      otherRemunerationsDataTypes,
    }),
  ).map(
    key =>
      MonthlyInfo({
        data,
        baseRemunerationDataTypes,
        otherRemunerationsDataTypes,
      })[key],
  );

  function transformGrpahTitle() {
    if (baseRemunerationDataTypes === 'remuneracao_base_por_membro') {
      return 'Média de remuneração por membro';
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
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '100%',
            },
          },
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
          chart: {
            width: '100%',
          },
          yaxis: {
            max: (() => {
              const max = Math.max(...RemunerationArr.map(month => month));
              return max + max * 0.1;
            })(),
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
        columnWidth: '70%',
      },
    },
    yaxis: {
      max: (() => {
        const max = Math.max(...RemunerationArr.map(month => month));
        return max + max * 0.1;
      })(),
      decimalsInFloat: 2,
      forceNiceScale: true,
      title: {
        text: transformGrpahTitle(),
        offsetY: 10,
        offsetX: 6.5,
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
      ...(agency
        ? { enabledOnSeries: [0, 1, 2, 3, 4] }
        : { enabledOnSeries: [1, 2, 3, 4] }),
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
          if (MonthlyInfoArr[MONTHS[val]] === undefined) {
            return 'Sem Dados';
          }
          return `${MONTHS[val]}`;
        },
      },
      y: {
        formatter(val, opts) {
          if (opts.w.globals.seriesNames[opts.seriesIndex] === 'Membros') {
            return `${val}`;
          }
          if (opts.w.globals.seriesNames[opts.seriesIndex] === 'Descontos') {
            return `${formatCurrencyValue(val * 1000000000, 1)}`;
          }

          return formatCurrencyValue(val, 1);
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
      tooltip: {
        enabled: false,
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
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      colors: ['', '', '', '', '', '', '#57659d'],
    },
  };
};

export const graphSeries = ({
  data,
  year,
  agency,
  hidingRemunerations,
  hidingBenefits,
  hidingWage,
  hidingErrors,
  hidingNoData,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
  discountsDataTypes,
}: {
  data: v2MonthTotals[];
  year: number;
  agency: Agency;
  hidingRemunerations: boolean;
  hidingBenefits: boolean;
  hidingWage: boolean;
  hidingErrors: boolean;
  hidingNoData: boolean;
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
  discountsDataTypes: string;
}): ApexAxisChartSeries | ApexNonAxisChartSeries => [
  {
    type: 'bar',
    name: 'Membros',
    data: (() => {
      if (agency) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map((v, i) =>
          fixYearDataArray(data)[i]
            ? fixYearDataArray(data)[i].total_membros
            : v,
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
  },
  {
    type: 'bar',
    name: 'Descontos',
    data: (() =>
      createArrayFilledWithValue({ size: 12, value: 0 })
        .map((v, i) =>
          fixYearDataArray(data)[i]
            ? fixYearDataArray(data)[i][discountsDataTypes]
            : v,
        )
        .map(d => d / 1000000000))(),
  },
  {
    type: 'bar',
    name: 'Benefício bruto',
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
    type: 'bar',
    name: 'Salário bruto',
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
    type: 'line',
    name: 'Remuneração líquida',
    data: (() => {
      if (!hidingRemunerations) {
        return createArrayFilledWithValue({ size: 12, value: 0 }).map((v, i) =>
          fixYearDataArray(data)[i]
            ? fixYearDataArray(data)[i][baseRemunerationDataTypes] +
              fixYearDataArray(data)[i][otherRemunerationsDataTypes] -
              fixYearDataArray(data)[i][discountsDataTypes]
            : v,
        );
      }
      return createArrayFilledWithValue({ size: 12, value: 0 });
    })(),
    color: '#57659d',
  },
  {
    type: 'bar',
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
    type: 'bar',
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
