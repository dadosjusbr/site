import { Paper, Box } from '@mui/material';

const NotCollecting: React.FC<{
  agency: any;
}> = ({ agency }) => (
  <Paper elevation={0}>
    <Box p={4}>
      <p>
        Não foi possível realizar a coleta de dados deste órgão pelos seguintes
        motivos:
      </p>
      <ul>
        {agency.collecting[0].description.map(desc => (
          <li>{desc}</li>
        ))}
      </ul>
    </Box>
  </Paper>
);

export default NotCollecting;
