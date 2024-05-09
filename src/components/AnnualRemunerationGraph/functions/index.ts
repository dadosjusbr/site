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
        d.meses_com_dados < new Date().getMonth()) ||
      (d.ano === getCurrentYear() &&
        new Date().getDate() < COLLECT_INFOS.COLLECT_DATE &&
        d.meses_com_dados < new Date().getMonth() - 1),
  );

const monthsWithoutData = ({ data }: { data: AnnualSummaryData[] }): number => {
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
  type,
}: {
  data: AnnualSummaryData[];
  baseRemunerationDataTypes?: string;
  otherRemunerationsDataTypes?: string;
  type?: 'rubrica';
}): number[] => {
  const noDataArr: number[] = [];

  if (type === 'rubrica') {
    for (let i = 2018; i <= getCurrentYear(); i += 1) {
      if (yearsWithData(data)?.includes(i)) {
        noDataArr.push(0);
      } else if (!yearsWithData(data)?.includes(i)) {
        noDataArr.push(
          data
            .map(d => d.resumo_rubricas.outras)
            .reduce((a, b) => {
              if (a > b) {
                return a;
              }
              return b;
            }, 0),
        );
      }
    }
  } else {
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
          : d[baseRemunerationDataTypes]) +
        (d[otherRemunerationsDataTypes] === undefined
          ? 0
          : d[otherRemunerationsDataTypes]),
    );

  const dataArray: number[] = [];
  for (let i = 2018; i <= getCurrentYear(); i += 1) {
    if (yearsWithData(data)?.includes(i)) {
      dataArray.push(
        +totalRemunerationArr[yearsWithData(data)?.indexOf(i)].toFixed(2),
      );
    } else if (!yearsWithData(data)?.includes(i)) {
      dataArray.push(0);
    }
  }

  return dataArray;
};

export const createDataArray = ({
  tipoRemuneracao,
  data,
  type,
}: {
  tipoRemuneracao: string;
  data: AnnualSummaryData[];
  type?: 'rubrica';
}): number[] => {
  let incomingData = [];

  if (type === 'rubrica') {
    incomingData = data
      ?.sort((a, b) => a.ano - b.ano)
      .map(d =>
        d.resumo_rubricas[tipoRemuneracao] === undefined
          ? 0
          : d.resumo_rubricas[tipoRemuneracao],
      );
  } else {
    incomingData = data
      ?.sort((a, b) => a.ano - b.ano)
      .map(d => (d[tipoRemuneracao] === undefined ? 0 : d[tipoRemuneracao]));
  }

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
  agency: Agency,
  baseRemunerationDataTypes: string,
  otherRemunerationsDataTypes: string,
): string => {
  // condição específica para o TRF6, que foi criado em 2022.
  if (
    noData({
      data,
      baseRemunerationDataTypes,
      otherRemunerationsDataTypes,
    }).find(d => d !== 0) &&
    agency.id_orgao === 'trf6'
  ) {
    return `Este órgão foi criado em 2022 não publicou dados de ${
      yearsWithoutData(data).length - 4
    }
        ${yearsWithoutData(data).length > 1 ? 'anos' : 'ano'}${
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
    noData({
      data,
      baseRemunerationDataTypes,
      otherRemunerationsDataTypes,
    }).find(d => d !== 0)
  ) {
    return `Este órgão não publicou dados de ${yearsWithoutData(data).length}
        ${yearsWithoutData(data).length > 1 ? 'anos' : 'ano'}${
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
