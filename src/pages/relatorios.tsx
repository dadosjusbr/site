import Head from 'next/head';
import { Box, Grid, Typography, Container } from '@mui/material';
import ReportsClipping from '../components/Common/Reports';
import reportsJSON from '../../public/reports.json';
import Nav from '../components/Essentials/Header';
import Footer from '../components/Essentials/Footer';

export async function getStaticProps() {
  return {
    props: {
      reports: reportsJSON,
    },
  };
}

const ReportsPage = ({ reports }) => (
  <>
    <Head>
      <title>DadosJusBr</title>
      <meta property="og:image" content="/img/icon_dadosjus_background.png" />
      <meta property="og:title" content="DadosJusBr" />
      <meta
        property="og:description"
        content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
      />
    </Head>
    <Nav />
    <Container fixed>
      <Box mb={8}>
        <Typography variant="h1" mt={6}>
          Relatórios
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          rowSpacing={2}
          columnSpacing={4}
        >
          {ReportsClipping({ reports }).map(n => (
            <Grid item xs={12} md={6} sm={6} key={n.props.report.title}>
              <Box my={1}>{n}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    <Footer />
  </>
);

export default ReportsPage;
