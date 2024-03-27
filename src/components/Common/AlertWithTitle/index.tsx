import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);

  return (
    <Collapse in={open}>
      <Alert
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          my: 2,
          bgcolor: 'info.main',
          color: 'info.contrastText',
        }}
        severity="info"
      >
        <AlertTitle>Aviso</AlertTitle>O padrão de separador decimal do site está
        sendo atualizado para o padrão brasileiro, que utiliza vírgula ao invés
        de ponto. Durante a atualização, você poderá notar formatação
        inconsistente em alguns pacotes de dados baixados no site.
      </Alert>
    </Collapse>
  );
}
