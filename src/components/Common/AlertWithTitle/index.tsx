import { Box, Button, Backdrop, Modal, Fade, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';

type TransitionModalProps = {
  children: React.ReactNode;
  open: boolean;
  downloadLink: string;
  handleClose: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#3e5363',
  border: '1px solid white',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const index = ({
  children,
  open,
  downloadLink,
  handleClose,
}: TransitionModalProps) => (
  <div>
    {children}
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 800 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            display="flex"
            alignItems="center"
          >
            <InfoIcon sx={{ mr: 1 }} /> Aviso
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2, textAlign: 'justify' }}
          >
            O padrão de separador decimal do site está sendo atualizado para o
            padrão brasileiro, que utiliza vírgula ao invés de ponto. Durante a
            atualização, você poderá notar formatação inconsistente em alguns
            pacotes de dados baixados no site.
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button color="info" autoFocus onClick={handleClose}>
              <Typography variant="button" mr={1}>
                Cancelar
              </Typography>
            </Button>
            <Button color="success" href={downloadLink} autoFocus>
              <Typography variant="button" mr={1}>
                Continuar o download
              </Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  </div>
);

export default index;
