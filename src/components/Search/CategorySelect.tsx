import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type CategorySelectProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategorySelect = ({ category, setCategory }: CategorySelectProps) => {
  const categoryHandleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        Categoria de remuneração
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Categoria de remuneração"
        onChange={categoryHandleChange}
      >
        <MenuItem value="Tudo">Tudo</MenuItem>
        <MenuItem value="Remuneração base">Remuneração base</MenuItem>
        <MenuItem value="Outras remunerações">Outras remunerações</MenuItem>
        <MenuItem value="Descontos">Descontos</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
