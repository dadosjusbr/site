import { useState } from 'react';
import { Paper, Box, Button, Grid } from '@mui/material';
import TransitionModal from '../TransitionModal';

const NotCollecting: React.FC<{
  agency: Agency;
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
            <TransitionModal
              agency={agency}
              open={open}
              handleClose={handleClose}
              style={style}
            >
              <Button onClick={handleOpen} variant="outlined" color="secondary">
                AJUDE-NOS A ABRIR OS DADOS
              </Button>
            </TransitionModal>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default NotCollecting;
