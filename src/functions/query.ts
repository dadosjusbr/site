import api from '../services/api';

const makeQueryFromList = (word: string, list: Array<string>) => {
  if (list.length === 0) {
    return '';
  }
  let q = '&';
  q += `${word}=`;
  list.forEach(item => {
    q += `${item},`;
  });
  q = q.slice(0, -1);
  return q;
};

const makeQueryFromValue = (
  word: string,
  value: string,
  values: Array<string>,
  equivalents: Array<string>,
) => {
  if (!value) return '';
  for (let i = 0; i < values.length; i += 1) {
    if (value === values[i]) {
      if (!equivalents[i]) return '';
      return `&${word}=${equivalents[i]}`;
    }
  }
  return ``;
};

type SearchHandleClickProps = {
  selectedYears: number;
  years: Array<number>;
  selectedMonths: Array<Month>;
  selectedAgencies: Array<Agency>;
  category: string;
  setLoading: (loading: boolean) => void;
  setShowResults: (showResults: boolean) => void;
  setQuery: (query: string) => void;
  setResult: (result: Array<SearchResult>) => void;
  setDownloadAvailable: (downloadAvailable: boolean) => void;
  setDownloadLimit: (downloadLimit: number) => void;
  setNumRowsIfAvailable: (numRowsIfAvailable: number) => void;
};

export const searchHandleClick = async ({
  selectedYears,
  years,
  selectedMonths,
  selectedAgencies,
  category,
  setLoading,
  setShowResults,
  setQuery,
  setResult,
  setDownloadAvailable,
  setDownloadLimit,
  setNumRowsIfAvailable,
}: SearchHandleClickProps) => {
  setLoading(true);
  setShowResults(false);
  try {
    let q = '?';
    const qSelectedYears = makeQueryFromValue(
      'anos',
      selectedYears.toString(),
      years.map(y => y.toString()),
      years.map(y => y.toString()),
    );
    const qSelectedMonths = makeQueryFromList(
      'meses',
      selectedMonths.map(m => String(m.value)),
    );
    const qSelectedAgencies = makeQueryFromList(
      'orgaos',
      selectedAgencies.map(m => m.id_orgao),
    );
    const qCategories = makeQueryFromValue(
      'categorias',
      category,
      ['Remuneração base', 'Outras remunerações', 'Descontos', 'Tudo'],
      ['base', 'outras', 'descontos', ''],
    );
    q = `${q}${qSelectedYears}${qSelectedMonths}${qSelectedAgencies}${qCategories}`;
    setQuery(q);
    const res = await api.ui.get(`/v2/pesquisar${q}`);
    const data = res.data.result.map((d, i) => {
      const item = d;
      item.id = i + 1;
      return item;
    });
    setResult(data);
    setDownloadAvailable(res.data.download_available);
    setDownloadLimit(res.data.download_limit);
    setNumRowsIfAvailable(res.data.num_rows_if_available);
    setShowResults(true);
  } catch (err) {
    setResult([]);
    setDownloadAvailable(false);
    setShowResults(false);
  }
  setLoading(false);
};
