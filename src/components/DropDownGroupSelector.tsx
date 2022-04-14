import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';
import { FormControl, MenuItem, OutlinedInput } from '@mui/material';
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
  const router = useRouter();
  const [agency, setAgency] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    const a = event.target.value as string;
    setAgency(a);
    router.push(`/grupo/${a}`);
  };
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={agency}
        label="Age"
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Dados por órgão' }}
        input={<OutlinedInput />}
      >
        <MenuItem disabled value="">
          Dados por órgão
        </MenuItem>
        {(() => {
          const list = [];
          for (const i in STATE_AGENCIES) {
            list.push(i);
          }
          return list.map(i => (
            <MenuItem key={STATE_AGENCIES[i]} value={STATE_AGENCIES[i]}>
              {formatToAgency(i)}
            </MenuItem>
          ));
        })()}
      </Select>
    </FormControl>
  );
};

export default DropDownGroupSelector;

function formatToAgency(agency: string) {
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
