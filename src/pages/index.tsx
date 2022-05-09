import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DropDownGroupSelector from '../components/DropDownGroupSelector';
import RemunerationBarGraph from '../components/RemunerationBarGraph';
import api from '../services/api';
import MONTHS from '../@types/MONTHS';
import theme from '../styles/theme-light';

export default function Index({
  agencyAmount,
  monthAmount,
  startDate,
  endDate,
  recordAmount,
  finalValue,
}) {
  const formatedStartDate = useMemo<string>(() => {
    const d = new Date(startDate);
    return `${MONTHS[d.getMonth() + 1]} de ${d.getFullYear()}`;
  }, [startDate]);
  const formatedEndDate = useMemo<string>(() => {
    const d = new Date(endDate);
    return `${MONTHS[d.getMonth() + 1]} de ${d.getFullYear()}`;
  }, [endDate]);
  const [completeChartData, setCompleteChartData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [loading, setLoading] = useState(true);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  useEffect(() => {
    fetchGeneralChartData();
  }, [year]);
  async function fetchGeneralChartData() {
    try {
      const { data } = await api.ui.get(`/geral/remuneracao/${year}`);
      setCompleteChartData(
        data.map(d => ({
          BaseRemuneration: d.base_remuneration,
          OtherRemunerations: d.other_remunerations,
          // eslint-disable-next-line no-underscore-dangle
          Month: d._id,
        })),
      );
    } catch (error) {
      setCompleteChartData([]);
    }
    setLoading(false);
  }
  return (
    <Page>
      <Head>
        <title>DadosJusBr</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta property="og:title" content="DadosJusBr" />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
        />
      </Head>
      <Header />
      <Container>
        <Headline>
          O DadosJusBr recupera continuamente dados dos diferentes orgãos do
          sistema de jusiça, os padroniza e publica como dado aberto. Libertamos
          os dados.
          <br />
          Já são{' '}
          <Typography variant="inherit" component="span" color="success.main">
            {monthAmount}
          </Typography>{' '}
          Meses de{' '}
          <Typography variant="inherit" component="span" color="success.main">
            {agencyAmount}
          </Typography>{' '}
          Orgãos libertados!
          <Box py={4}>
            <Typography component="p">
              Os dados vão de {formatedStartDate} a {formatedEndDate}, e incluem{' '}
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                {recordAmount}
              </Typography>{' '}
              registros de pagamentos de salários, indenizações, gratificações e
              diárias, somando{' '}
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                R$ {(finalValue / 1000000000).toFixed(2)} bilhões
              </Typography>
              .
            </Typography>
          </Box>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4} textAlign="center">
              <Button color="info" size="large" endIcon={<ArrowDownwardIcon />}>
                Índice de transparência
              </Button>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Button color="info" size="large" endIcon={<ArrowDownwardIcon />}>
                Dados gerais
              </Button>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <DropDownGroupSelector />
            </Grid>
          </Grid>
        </Headline>
      </Container>
      <Container>
        <Box my={4} py={4}>
          <Typography variant="h2" textAlign="center">
            Índice de Transparência
          </Typography>
          <Typography component="p" textAlign="center">
            Este gráfico representa dados de <b>Jan de 2018</b> até{' '}
            <b>Dez de 2021</b> e foi gerado em <b>Mar de 2022</b>. Dados
            atualizados até <b>8 Fev de 2022</b>.
          </Typography>
          <Box
            mt={4}
            py={4}
            textAlign="center"
            sx={{ backgroundColor: 'info.main' }}
          >
            <img
              src="/img/indice_legenda.png"
              alt="Legenda do índice de transparência"
            />
            <img src="/img/indice.png" alt="Índice de transparência" />
          </Box>
        </Box>
      </Container>
      <ThemeProvider theme={theme}>
        <Container>
          <Box my={12}>
            <Typography variant="h2" textAlign="center">
              Total das remunerações dos membros de todos os órgãos
            </Typography>
            <Box textAlign="center">
              <IconButton
                aria-label="voltar"
                color="info"
                onClick={() => setYear(year - 1)}
                disabled={!previousDateIsNavigable}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography component="span" variant="h6">
                {year}
              </Typography>
              <IconButton
                aria-label="voltar"
                color="info"
                onClick={() => setYear(year + 1)}
                disabled={!nextDateIsNavigable}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Box my={4}>
              <RemunerationBarGraph
                year={year}
                data={completeChartData}
                dataLoading={loading}
                billion
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const { data } = await api.ui.get('/geral/resumo');
    return {
      props: {
        agencyAmount: data.AgencyAmount,
        monthAmount: data.MonthlyTotalsAmount,
        startDate: data.StartDate,
        endDate: data.EndDate,
        recordAmount: `${data.RemunerationRecordsCount}`,
        finalValue: `${data.GeneralRemunerationValue}`,
      },
    };
  } catch (err) {
    // context.res.writeHead(301, {
    //   Location: `/404`,
    // });
    // context.res.end();
    return { props: {} };
  }
};
const Page = styled.div`
  background: #3e5363;
`;
const Headline = styled.div`
  margin-top: 1rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  padding-right: 1rem;
  padding-left: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  background-image: url('img/bg.svg');
  background-position: right top;
  background-repeat: no-repeat;
  background-size: contain;
  @media (min-width: 600px) {
    padding-right: 8rem;
    font-size: 2rem;
  }
  @media (min-width: 900px) {
    padding-right: 22rem;
    font-size: 2rem;
  }
`;
