import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';
import {
  FormControl,
  InputBase,
  OutlinedInput,
  ListSubheader,
  MenuItem,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { formatToAgency } from '../../../functions/format';

export interface DropDownGroupSelectorProps
  extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: string;
  noStyle?: boolean;
  inputType?: 'outlined' | 'standard' | 'filled';
  minWidth?: number;
  maxWidth?: number;
}

const DropDownGroupSelector: React.FC<DropDownGroupSelectorProps> = ({
  value,
  noStyle = false,
  inputType = 'standard',
  minWidth = 240,
  maxWidth = 250,
}) => {
  const router = useRouter();
  const [agencyName, setAgencyName] = React.useState(value || '');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const v = event.target.value as string;
    setAgencyName(v);
    router.push(`/grupo/${v}`);
  };

  return (
    <FormControl
      sx={{
        minWidth,
        maxWidth,
      }}
    >
      <Select
        id="orgaos-select"
        labelId="orgaos-select-label"
        defaultValue=""
        value={agencyName}
        label="Estados"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Dados por órgão' }}
        input={inputType === 'outlined' ? <OutlinedInput /> : <InputBase />}
        IconComponent={() => {
          if (open) {
            return (
              <ArrowDropUpIcon
                onClick={() => setOpen(prev => !prev)}
                sx={{ cursor: 'pointer' }}
              />
            );
          }
          return (
            <ArrowDropDownIcon
              onClick={() => setOpen(prev => !prev)}
              sx={{ cursor: 'pointer' }}
            />
          );
        }}
        renderValue={selected => {
          if (selected.length === 0) {
            return (
              <Typography
                pb={0}
                {...(!noStyle && { textTransform: 'uppercase' })}
              >
                Navegar Pelos Dados
              </Typography>
            );
          }
          return formatToAgency(selected);
        }}
        sx={{
          height: 40,
          pb: 0,
          ...{
            ...(!noStyle &&
              inputType === 'standard' && {
                borderBottom: '2px solid #b361c6',
              }),
          },
          '& #orgaos-select': {
            padding: '0 0 0 10px',
          },
        }}
      >
        <ListSubheader>
          <em>Grupos disponíveis</em>
        </ListSubheader>
        <MenuItem key="0" value="JUSTICA-ESTADUAL">
          Justiça Estadual
        </MenuItem>
        <MenuItem key="1" value="MINISTERIOS-PUBLICOS">
          Ministérios Públicos
        </MenuItem>
        <MenuItem key="2" value="JUSTICA-DO-TRABALHO">
          Justiça do Trabalho
        </MenuItem>
        <MenuItem key="3" value="JUSTICA-MILITAR">
          Justiça Militar
        </MenuItem>
        <MenuItem key="4" value="JUSTICA-FEDERAL">
          Justiça Federal
        </MenuItem>
        <MenuItem key="5" value="JUSTICA-ELEITORAL">
          Justiça Eleitoral
        </MenuItem>
        <MenuItem key="6" value="JUSTICA-SUPERIOR">
          Justiça Superior
        </MenuItem>
        <MenuItem key="7" value="CONSELHOS-DE-JUSTICA">
          Conselhos de Justiça
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropDownGroupSelector;
