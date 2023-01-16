import { Typography, Paper, Box } from '@mui/material';

function Error() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Paper sx={{ width: '50%', m: 'auto', p: 2 }}>
          <Typography variant="h6">
            Não foi possível acessar este conteúdo
          </Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Error;
