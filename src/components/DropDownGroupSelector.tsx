import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';
import {
  FormControl,
  ListSubheader,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import STATE_AGENCIES from '../@types/STATE_AGENCIES';

export interface DropDownGroupSelectorProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: STATE_AGENCIES;
}

const DropDownGroupSelector: React.FC<DropDownGroupSelectorProps> = ({
  value,
  ...rest
}) => {
  const stateAgencies = Object.keys(STATE_AGENCIES).map((name, i) => ({
    id: i,
    name,
    value: STATE_AGENCIES[name as keyof typeof STATE_AGENCIES],
  }));

  const router = useRouter();
  const [agencyName, setAgencyName] = React.useState(
    value || '',
  );

  const handleChange = (event: SelectChangeEvent) => {
    const v = event.target.value as string;
    setAgencyName(v);
    router.push(`/grupo/${v}`);
  };

  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 240 }}>
      <Select
        id="orgaos-select"
        labelId="orgaos-select-label"
        defaultValue=""
        value={agencyName}
        label="Estados"
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Dados por órgão' }}
        input={<OutlinedInput />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <em>Selecione</em>;
          }
          return selected;
        }}
      >
        <MenuItem key="-2" value="Federal">
          Justiça Federal
        </MenuItem>
        <MenuItem key="-1" value="Militar">
          Justiça Militar
        </MenuItem>
        <MenuItem key="0" value="Trabalho">
          Justiça do Trabalho
        </MenuItem>
        <ListSubheader>
          <em>Justiça Estadual e do Distrito Federal</em>
        </ListSubheader>
        {stateAgencies.map(ag => (
          <MenuItem key={ag.id} value={ag.value}>
            {formatToAgency(ag.name)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownGroupSelector;

function formatToAgency(agency: string) {
  if (agency === '') {
    return '';
  }
  const sub = agency.split('_');
  const formatedSubs = sub.map(s => {
    const a = s.toLowerCase();
    const newString = a.split('');
    newString[0] = a[0].toLocaleUpperCase();
    return newString.join('');
  });
  const a = formatedSubs.join(' ');
  return a;
}
