import { useState } from 'react';
import ReactGA from 'react-ga4';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import theme from '../../../styles/theme-dark';

type DownloadDumpDialogProps = {
  fileLink: string;
  open: boolean;
  onClose: () => void;
};

export default function DownloadDumpDialog({
  fileLink,
  open,
  onClose,
}: DownloadDumpDialogProps) {
  const handleDownload = () => {
    ReactGA.event('file_download', {
      category: 'download',
      action: `From: ${window.location.pathname}`,
    });
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.info.main}`,
            color: theme.palette.info.main,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {
            'Fazer o download de todas as informações de remunerações da nossa base de dados?'
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            color={theme.palette.info.main}
          >
            O download de um conjunto de dados muito grande pode levar a uma
            demora significativa devido ao tamanho do arquivo. Isso pode afetar
            a eficiência de suas atividades, pois o download pode levar mais
            tempo do que o esperado.
          </DialogContentText>
          <DialogContentText color={theme.palette.info.main}>
            Gerenciar e analisar grandes conjuntos de dados também requer
            ferramentas e habilidades especializadas. Portanto, recomendamos que
            você considere cuidadosamente esses fatores antes de prosseguir com
            o download.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            color="success"
            onClick={handleDownload}
            href={fileLink}
            autoFocus
          >
            Baixar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
