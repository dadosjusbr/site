import ReactGA from 'react-ga4';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import theme from '../../../styles/theme-dark';
import { Box, Typography } from '@mui/material';

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
          Fazer o download de todas as informações de remunerações da nossa base
          de dados
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            color={theme.palette.info.main}
          >
            Ao realizar o download de um conjunto de dados extenso, é importante
            estar ciente de que o processo pode levar um tempo considerável
            devido ao tamanho do arquivo.
          </DialogContentText>
          <DialogContentText color={theme.palette.info.main}>
            Gerenciar e analisar grandes conjuntos de dados também requer
            ferramentas especializadas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Button color="success" href="/pesquisar" autoFocus>
              <Typography variant="button" mr={1}>
                Baixar um subconjunto dos dados
              </Typography>
            </Button>
            <Button
              color="success"
              onClick={handleDownload}
              href={fileLink}
              autoFocus
            >
              <Typography variant="button" mr={1}>
                Baixar todos os dados
              </Typography>
              <Typography variant="button" color="#fff">
                151.2 MB
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
