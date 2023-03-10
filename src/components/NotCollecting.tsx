import { useState } from 'react';
import {
  Paper,
  Box,
  Button,
  Grid,
  Backdrop,
  Modal,
  Fade,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const NotCollecting: React.FC<{
  agency: any;
}> = ({ agency }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  function TransitionsModal({ children }) {
    return (
      <div>
        {children}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 800,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Ajude na inclusão de dados do {agency.nome}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Para ajudar a incluir os dados deste tribunal no DadosJusBr,
                você pode protocolar um requerimento na ouvidoria solicitando
                mudanças na
                {agency.coletando
                  ? agency.coletando[0].descricao.map(
                      (desc: string, index: number) => (
                        <span key={desc}>
                          {` ${desc
                            .split(' ')
                            .at(0)
                            .toLowerCase()} ${desc
                            .split(' ')
                            .at(1)} ${desc.split(' ').at(2)}
                    ${
                      agency.coletando[0].descricao.length > 1 && index === 0
                        ? 'e'
                        : ''
                    }`}
                        </span>
                      ),
                    )
                  : agency.collecting[0].description.map(
                      (desc: string, index: number) => (
                        <span key={desc}>{` ${desc
                          .split(' ')
                          .at(0)
                          .toLowerCase()} ${desc.split(' ').at(1)} ${desc
                          .split(' ')
                          .at(2)}
                    ${
                      agency.collecting[0].description.length > 1 && index === 0
                        ? 'e'
                        : ''
                    }`}</span>
                      ),
                    )}
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="outlined"
                  color="info"
                  href={agency.ouvidoria}
                  target="_blank"
                  endIcon={<ArrowForwardIosIcon />}
                >
                  Ir para a ouvidoria
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  return (
    <Paper elevation={0}>
      <Box p={4}>
        <Grid display="flex" justifyContent="space-between">
          <Grid item>
            {agency.coletando &&
            agency.coletando.length > 0 &&
            agency.coletando[0].descricao ? (
              <>
                <p>
                  Não foi possível realizar a coleta de dados deste órgão pelos
                  seguintes motivos:
                </p>
                <ul>
                  {agency.coletando[0].descricao.map((desc: string) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Não foi possível realizar a coleta de dados deste órgão.</p>
            )}
          </Grid>
          <Grid item mx={2}>
            <TransitionsModal>
              <Button onClick={handleOpen} variant="outlined" color="secondary">
                AJUDE-NOS A ABRIR OS DADOS
              </Button>
            </TransitionsModal>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default NotCollecting;
