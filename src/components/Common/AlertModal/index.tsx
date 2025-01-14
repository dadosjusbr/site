import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const AlertModal = ({
  agencyData,
  openParam,
  handleOpen,
  handleClose,
  children,
  openOmbudsman = true,
}) => {
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

  return (
    <>
      <Alert
        severity="warning"
        variant="filled"
        sx={{
          alignItems: 'center',
          width: 'fit-content',
          cursor: 'pointer',
          textAlign: 'start',
        }}
        onClick={() => handleOpen()}
      >
        {children} {openOmbudsman && <u>Ajude-nos a abrir os dados.</u>}
      </Alert>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openParam}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 800 } }}
      >
        <Fade in={openParam}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ajude na inclusão de dados do {agencyData?.nome}
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, textAlign: 'justify' }}
            >
              Este órgão não conta com todos os dados de remunerações. Você pode
              ajudar o DadosJusBr fazendo um requerimento na ouvidoria deste
              órgão solicitando a publicação recorrente de todos gastos.
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                color="info"
                href={agencyData?.ouvidoria}
                target="_blank"
                endIcon={<ArrowForwardIosIcon />}
              >
                Ir para a ouvidoria
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AlertModal;
