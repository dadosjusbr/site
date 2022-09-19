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
import FEDERAL_AGENCIES from '../@types/FEDERAL_AGENCIES';
import MILITAR_AGENCIES from '../@types/MILITAR_AGENCIES';
import TRABALHO_AGENCIES from '../@types/TRABALHO_AGENCIES';

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
  const federalAgencies = Object.keys(FEDERAL_AGENCIES).map((name, i) => ({
    id: i,
    name,
    value: FEDERAL_AGENCIES[name as keyof typeof FEDERAL_AGENCIES],
  }));
  const militarAgencies = Object.keys(MILITAR_AGENCIES).map((name, i) => ({
    id: i,
    name,
    value: MILITAR_AGENCIES[name as keyof typeof MILITAR_AGENCIES],
  }));
  const trabalhoAgencies = Object.keys(TRABALHO_AGENCIES).map((name, i) => ({
    id: i,
    name,
    value: TRABALHO_AGENCIES[name as keyof typeof TRABALHO_AGENCIES],
  }));
  const agencies = [...stateAgencies, ...federalAgencies, ...militarAgencies, ...trabalhoAgencies];

  const getAgencyNameByValue = (v: string): string => {
    const ag = agencies.filter(a => a.value === v)[0];
    if (typeof ag !== 'undefined' && ag !== null) {
      return ag.name;
    }
    return '';
  };

  const router = useRouter();
  const [agencyName, setAgencyName] = React.useState(
    formatToAgency(getAgencyNameByValue(value)) || '',
  );

  const handleChange = (event: SelectChangeEvent) => {
    const v = event.target.value as string;
    setAgencyName(formatToAgency(getAgencyNameByValue(v)));
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
        {federalAgencies.map(ag => (
          <MenuItem key={ag.id} value={ag.value}>
            {formatToAgency(ag.name)}
          </MenuItem>
        ))}
        {militarAgencies.map(ag => (
          <MenuItem key={ag.id} value={ag.value}>
            {formatToAgency(ag.name)}
          </MenuItem>
        ))}
        {trabalhoAgencies.map(ag => (
          <MenuItem key={ag.id} value={ag.value}>
            {formatToAgency(ag.name)}
          </MenuItem>
        ))}
        <ListSubheader>
          <em>Órgãos Estaduais e Distrito Federal</em>
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
