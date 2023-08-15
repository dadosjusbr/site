import dynamic from 'next/dynamic';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { graphOptions } from '../functions/graphConfig';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const index = ({ chartData }: { chartData: AgencyRemuneration }) => (
  <Grid item xs={12}>
    <Paper elevation={0}>
      <Box pt={4} py={4} px={2}>
        <Typography variant="h6" textAlign="center">
          Distribuição de remunerações de membros
        </Typography>
        <Box px={2}>
          {!chartData.histograma ? (
            <Box display="flex" justifyContent="center">
              <Typography variant="h1">
                Não há dados de membros para esse mês
              </Typography>
            </Box>
          ) : (
            <Chart
              options={graphOptions}
              series={[
                {
                  name: 'Membros',
                  data: [
                    chartData.histograma['-1'],
                    chartData.histograma['50000'],
                    chartData.histograma['40000'],
                    chartData.histograma['30000'],
                    chartData.histograma['20000'],
                    chartData.histograma['10000'],
                  ],
                },
              ]}
              width="100%"
              height="500"
              type="bar"
            />
          )}
        </Box>
      </Box>
    </Paper>
  </Grid>
);

export default index;
