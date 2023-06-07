import MONTHS from '../../../@types/MONTHS';
import { getCurrentYear } from '../../../functions/currentYear';

export const MonthlyInfo = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: v2MonthTotals[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}) => {
  let object = {};
  data?.forEach(element => {
    object = {
      ...object,
      [MONTHS[element.mes]]:
        element[baseRemunerationDataTypes] +
        element[otherRemunerationsDataTypes],
    };
  });
  return object;
};

// functions to normalize data
export function createArrayFilledWithValue<T>({
  size,
  value,
}: {
  size: number;
  value: T;
}): T[] {
  const array = [];
  for (let i = 0; i < size; i += 1) {
    array.push(value);
  }
  return array;
}
export function fixYearDataArray(array: v2MonthTotals[]) {
  const a = createArrayFilledWithValue({ size: 12, value: undefined });
  array.forEach(v => {
    a[v.mes - 1] = v;
  });
  return a;
}

// this constant is used as an alx value to determine the max graph height
export const MaxMonthPlaceholder = ({
  data,
  baseRemunerationDataTypes,
  otherRemunerationsDataTypes,
}: {
  data: v2MonthTotals[];
  baseRemunerationDataTypes: string;
  otherRemunerationsDataTypes: string;
}) => {
  const found = data
    ?.filter(d => !d.error)
    .sort(
      (a, b) =>
        a[baseRemunerationDataTypes] +
        a[otherRemunerationsDataTypes] -
        (b[baseRemunerationDataTypes] + b[otherRemunerationsDataTypes]),
    )
    .reverse()[0];
  // 10000 is used here as the min value of chart height
  return found
    ? found[baseRemunerationDataTypes] + found[otherRemunerationsDataTypes] + 1
    : 10000;
};

export const monthsWithoutData = ({
  data,
  year,
}: {
  data: v2MonthTotals[];
  year: number;
}): number[] => {
  const months: number[] = [];
  for (let i = 1; i <= 12; i += 1) {
    if (year === getCurrentYear()) {
      if (!data?.find(d => d.mes === i) && i < new Date().getMonth()) {
        months.push(i);
      }
    } else if (!data?.find(d => d.mes === i)) {
      months.push(i);
    }
  }
  return months;
};
