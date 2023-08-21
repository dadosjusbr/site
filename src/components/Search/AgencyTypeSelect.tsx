import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type AgencyTypeSelectProps = {
  ais: Agency[];
  type: string;
  setType: (type: string) => void;
  setAgencies: (agencies: Agency[]) => void;
};

const AgencyTypeSelect = ({
  ais,
  type,
  setType,
  setAgencies,
}: AgencyTypeSelectProps) => {
  const typeHandleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    if (event.target.value === 'Ministérios Públicos') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Ministério'));
    } else if (event.target.value === 'Justiça Estadual') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Estadual'));
    } else if (event.target.value === 'Justiça Militar') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Militar'));
    } else if (event.target.value === 'Justiça do Trabalho') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Trabalho'));
    } else if (event.target.value === 'Justiça Superior') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Superior'));
    } else if (event.target.value === 'Justiça Federal') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Federal'));
    } else if (event.target.value === 'Justiça Eleitoral') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Eleitoral'));
    } else if (event.target.value === 'Conselhos de Justiça') {
      setAgencies(ais.filter(a => a.jurisdicao === 'Conselho'));
    } else {
      setAgencies(ais);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Tipo de órgão</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Tipo de órgão"
        onChange={typeHandleChange}
      >
        <MenuItem value="Tudo" selected>
          Tudo
        </MenuItem>
        <MenuItem value="Justiça Estadual">Justiça Estadual</MenuItem>
        <MenuItem value="Ministérios Públicos">Ministérios Públicos</MenuItem>
        <MenuItem value="Justiça do Trabalho">Justiça do Trabalho</MenuItem>
        <MenuItem value="Justiça Militar">Justiça Militar</MenuItem>
        <MenuItem value="Justiça Federal">Justiça Federal</MenuItem>
        <MenuItem value="Justiça Eleitoral">Justiça Eleitoral</MenuItem>
        <MenuItem value="Justiça Superior">Justiça Superior</MenuItem>
        <MenuItem value="Conselhos de Justiça">Conselhos de Justiça</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AgencyTypeSelect;
