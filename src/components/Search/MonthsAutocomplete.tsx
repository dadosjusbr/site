import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Month = {
  name: string;
  value: number;
};

type MonthsAutocompleteProps = {
  months: Month[];
  selectedMonths: Month[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<Month[]>>;
  // monthsHandleChange: (newValue: Month[]) => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const MonthsAutocomplete = ({
  months,
  selectedMonths,
  setSelectedMonths,
}: MonthsAutocompleteProps) => {
  const monthsHandleChange = (newValue: Month[]) => {
    setSelectedMonths(newValue);
  };

  return (
    <Autocomplete
      multiple
      id="autocomplete-meses"
      options={months}
      disableCloseOnSelect
      getOptionLabel={option => option.name}
      value={selectedMonths}
      onChange={(event, newValue) => {
        monthsHandleChange(newValue);
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={params => <TextField {...params} label="Meses" />}
    />
  );
};

export default MonthsAutocomplete;
