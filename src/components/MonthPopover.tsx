import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import MONTHS from '../@types/MONTHS';

export default function MonthPopover({ children, agency, year }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectMonth = (month: number) => {
    handleClose();
    router.push(`/orgao/${agency}/${year}/${month}`);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const list = [];
  for (const i in MONTHS) {
    if (Number.isNaN(Number(i))) {
      list.push(i);
    }
  }

  return (
    <div>
      <Typography
        component="span"
        variant="h4"
        aria-describedby={id}
        onClick={handleClick}
      >
        {children}
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {list.map(month => (
            <Typography
              key={month}
              sx={{
                width: 145,
                cursor: 'pointer',
              }}
              onClick={selectMonth.bind(this, list.indexOf(month) + 1)}
            >
              <Button sx={{ width: '100%' }}>{month}</Button>
            </Typography>
          ))}
        </Typography>
      </Popover>
    </div>
  );
}
