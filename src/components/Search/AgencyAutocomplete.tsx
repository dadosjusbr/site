import {
  Autocomplete,
  Checkbox,
  TextField,
  createFilterOptions,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type AgencyOptionType = {
  id_orgao: string;
  nome: string;
};

type AgencyAutocompleteProps = {
  agencies: Agency[];
  selectedAgencies: any[];
  setSelectedAgencies: (value: React.SetStateAction<any[]>) => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AgencyAutocomplete = ({
  agencies,
  selectedAgencies,
  setSelectedAgencies,
}: AgencyAutocompleteProps) => {
  const agencyFilterOptions = createFilterOptions({
    stringify: (option: AgencyOptionType) => option.id_orgao + option.nome,
  });

  return (
    <Autocomplete
      multiple
      id="autocomplete-orgaos"
      options={agencies}
      disableCloseOnSelect
      getOptionLabel={option => option.id_orgao}
      value={selectedAgencies}
      onChange={(event, newValue) => {
        if (selectedAgencies.length < 3) {
          setSelectedAgencies(newValue);
        }
        if (
          selectedAgencies.includes(newValue.at(-1)) ||
          newValue.length === 0
        ) {
          setSelectedAgencies(newValue);
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.id_orgao === value.id_orgao
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.nome}
        </li>
      )}
      renderInput={params => <TextField {...params} label="Órgãos" />}
      filterOptions={agencyFilterOptions}
    />
  );
};

export default AgencyAutocomplete;
