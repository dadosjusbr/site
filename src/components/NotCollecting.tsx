import { Paper, Box } from '@mui/material';

const NotCollecting: React.FC<{
  agency: any;
}> = ({ agency }) => (
  <Paper elevation={0}>
    <Box p={4}>
      {agency.collecting &&
      agency.collecting.length > 0 &&
      agency.collecting[0].description ? (
        <>
          <p>
            Não foi possível realizar a coleta de dados deste órgão pelos
            seguintes motivos:
          </p>
          <ul>
            {agency.collecting[0].description.map(desc => (
              <li>{desc}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Não foi possível realizar a coleta de dados deste órgão.</p>
      )}
    </Box>
  </Paper>
);

export default NotCollecting;
