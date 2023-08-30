import { Autocomplete, MenuItem, TextField } from '@mui/material';

type YearsAutocompleteProps = {
  years: number[];
  selectedYears: number;
  setSelectedYears: (value: React.SetStateAction<number>) => void;
};

const YearAutocomplete = ({
  years,
  selectedYears,
  setSelectedYears,
}: YearsAutocompleteProps) => (
  <Autocomplete
    id="autocomplete-anos"
    options={years}
    getOptionLabel={option => `${option}`}
    value={selectedYears}
    onChange={(event, newValue) => {
      setSelectedYears(newValue);
    }}
    renderOption={(props, option) => (
      <MenuItem key={option} {...props} value={option}>
        {option}
      </MenuItem>
    )}
    renderInput={params => <TextField {...params} label="Ano" />}
  />
);

export default YearAutocomplete;
