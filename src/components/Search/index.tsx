import YearsAutocomplete from './YearsAutocomplete';
import MonthsAutocomplete from './MonthsAutocomplete';
import AgencyTypeSelect from './AgencyTypeSelect';
import AgencyAutocomplete from './AgencyAutocomplete';
import CategorySelect from './CategorySelect';
import Button from './Button';
import Result from './Result';

const setSearchURLFunc = (
  selectedYears: number,
  selectedMonths: Month[],
  selectedAgencies: Agency[],
  category: string,
) => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.set('anos', selectedYears != null ? selectedYears.toString() : '');
  params.set('meses', selectedMonths.map(m => String(m.value)).join(','));
  params.set('orgaos', selectedAgencies.map(a => a.id_orgao).join(','));
  params.set(
    'categorias',
    category
      .split(' ')
      .at(category === 'Remuneração base' ? -1 : 0)
      .toLowerCase(),
  );
  window.history.replaceState({}, '', `${url}`);
};

const Search = {
  YearsAutocomplete,
  MonthsAutocomplete,
  AgencyTypeSelect,
  AgencyAutocomplete,
  CategorySelect,
  Button,
  Result,
  setSearchURLFunc,
};

export default Search;
