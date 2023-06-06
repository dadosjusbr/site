import { getCurrentYear } from '../../../functions/currentYear';
import COLLECT_INFOS from '../../../@types/COLLECT_INFOS';

// this constant is used as an aux value to determine the max graph height when there is no data
const MaxMonthPlaceholder = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: AnnualSummaryData[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}): number => {
  const max = data
    ?.sort(
      (a, b) =>
        a[baseRemunerationDataTypes] +
        a[otherRemunerationsDataTypes] -
        (b[baseRemunerationDataTypes] + b[otherRemunerationsDataTypes]),
    )
    .reverse()[0];

  return max
    ? max[baseRemunerationDataTypes] + max[otherRemunerationsDataTypes] + 1
    : 10000;
};

const yearsWithData = (data: AnnualSummaryData[]): number[] =>
  data?.map(d => d.ano).sort((a, b) => a - b);

export const yearList = (): number[] => {
  const list = [];
  for (let i = 2018; i <= getCurrentYear(); i += 1) {
    list.push(i);
  }
  return list;
};

export const yearsWithoutData = (data: AnnualSummaryData[]): number[] =>
  yearList()?.filter(
    returnedYear => !yearsWithData(data)?.includes(returnedYear),
  );

export const getYearWithIncompleteData = (
  data: AnnualSummaryData[],
): AnnualSummaryData[] =>
  data?.filter(
    d =>
      (d.meses_com_dados < 12 && d.ano < getCurrentYear()) ||
      (d.ano === getCurrentYear() &&
        new Date().getDate() > COLLECT_INFOS.COLLECT_DATE &&
        d.meses_com_dados < 10 - new Date().getMonth()) ||
      (d.ano === getCurrentYear() &&
        new Date().getDate() < COLLECT_INFOS.COLLECT_DATE &&
        d.meses_com_dados < 9 - new Date().getMonth()),
  );

export const monthsWithoutData = ({
  data,
}: {
  data: AnnualSummaryData[];
}): number => {
  let monthsCount = 0;
  data
    ?.map(d => {
      if (d.ano === getCurrentYear()) {
        if (
          new Date() <
          new Date(
            getCurrentYear(),
            new Date().getMonth(),
            COLLECT_INFOS.COLLECT_DATE,
          )
        ) {
          return new Date().getMonth() - (d.meses_com_dados + 1);
        }
        return new Date().getMonth() - d.meses_com_dados;
      }
      return 12 - d.meses_com_dados;
    })
    .forEach(d => {
      monthsCount += d;
    });

  return monthsCount;
};

export const noData = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: AnnualSummaryData[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}): number[] => {
  const noDataArr: number[] = [];
  for (let i = 2018; i <= getCurrentYear(); i += 1) {
    if (yearsWithData(data)?.includes(i)) {
      noDataArr.push(0);
    } else if (!yearsWithData(data)?.includes(i)) {
      noDataArr.push(
        MaxMonthPlaceholder({
          data,
          baseRemunerationDataTypes,
          otherRemunerationsDataTypes,
        }),
      );
    }
  }
  return noDataArr;
};

export const totalWaste = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: AnnualSummaryData[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}): number[] => {
  const totalRemunerationArr = data
    ?.sort((a, b) => a.ano - b.ano)
    .map(
      d =>
        (d[baseRemunerationDataTypes] === undefined
          ? 0
          : d[baseRemunerationDataTypes] / 1000000) +
        (d[otherRemunerationsDataTypes] === undefined
          ? 0
          : d[otherRemunerationsDataTypes] / 1000000),
    );

  const dataArray: number[] = [];
  for (let i = 2018; i <= getCurrentYear(); i += 1) {
    if (yearsWithData(data)?.includes(i)) {
      dataArray.push(totalRemunerationArr[yearsWithData(data)?.indexOf(i)]);
    } else if (!yearsWithData(data)?.includes(i)) {
      dataArray.push(0);
    }
  }

  return dataArray;
};

export const createDataArray = ({
  tipoRemuneracao,
  data,
}: {
  tipoRemuneracao: string;
  data: AnnualSummaryData[];
}): number[] => {
  const incomingData = data
    ?.sort((a, b) => a.ano - b.ano)
    .map(d => (d[tipoRemuneracao] === undefined ? 0 : d[tipoRemuneracao]));

  const dataArray: number[] = [];
  for (let i = 2018; i <= getCurrentYear(); i += 1) {
    if (yearsWithData(data)?.includes(i)) {
      dataArray.push(incomingData[yearsWithData(data)?.indexOf(i)]);
    } else if (!yearsWithData(data)?.includes(i)) {
      dataArray.push(0);
    }
  }

  return dataArray;
};

export const warningMessage = (
  data: AnnualSummaryData[],
  baseRemunerationDataTypes: string,
  otherRemunerationsDataTypes: string,
) => {
  if (
    noData({
      data,
      baseRemunerationDataTypes,
      otherRemunerationsDataTypes,
    }).find(d => d !== 0)
  ) {
    return `Este órgão não publicou dados de ${yearsWithoutData.length}
        ${yearsWithoutData.length > 1 ? 'anos' : 'ano'}${
      monthsWithoutData({ data }) > 0
        ? ` e ${monthsWithoutData({ data })}`
        : '.'
    }
        ${
          monthsWithoutData({ data }) > 1
            ? 'meses.'
            : monthsWithoutData({ data }) === 1
            ? 'mês.'
            : ''
        }`;
  }
  if (
    monthsWithoutData({ data }) > 0 &&
    !noData({
      data,
      baseRemunerationDataTypes,
      otherRemunerationsDataTypes,
    }).find(d => d !== 0)
  ) {
    return `Este órgão não publicou dados de ${monthsWithoutData({ data })}
          ${
            monthsWithoutData({ data }) > 1
              ? 'meses.'
              : monthsWithoutData({ data }) === 1
              ? 'mês.'
              : ''
          }`;
  }
  return '';
};
