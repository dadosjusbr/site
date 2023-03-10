import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  IconButton,
  Link,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DropDownGroupSelector from '../components/DropDownGroupSelector';
import RemunerationBarGraph from '../components/RemunerationBarGraph';
import IndexChartLegend from '../components/IndexChartLegend';
import api from '../services/api';
import MONTHS from '../@types/MONTHS';
import light from '../styles/theme-light';
import { getCurrentYear } from '../functions/currentYear';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Index({
  startDate,
  endDate,
  recordAmount,
  finalValue,
  ais,
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
  // this state is used to check if the actual date is at least 17 days away from January 1st. The data collect always happen in the 17th day, so we set the default year after this first data collect of the year.
  const [year, setYear] = useState(getCurrentYear());
  const [loading, setLoading] = useState(true);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  useEffect(() => {
    fetchGeneralChartData();
  }, [year]);
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  async function fetchGeneralChartData() {
    try {
      const { data } = await api.ui.get(`/v2/geral/remuneracao/${year}`);
      setCompleteChartData(
        data.map(d => ({
          remuneracao_base: d.remuneracao_base,
          outras_remuneracoes: d.outras_remuneracoes,
          mes: d.mes,
        })),
      );
    } catch (error) {
      setCompleteChartData([]);
    }
    setLoading(false);
  }

  const collecting = ais.filter(ag => ag.collecting === undefined);

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
      <Container fixed>
        <Headline>
          O DadosJusBr liberta dados do sistema de Justiça. Recuperamos,
          padronizamos e publicamos continuamente as informações de remuneração
          de diferentes órgãos como dados abertos.
          <br />
          Disponibilizamos dados dos Tribunais de Justiça e dos Ministérios
          Públicos estaduais desde 2018. A atualização é realizada mensalmente.
          <Box py={4}>
            <Typography component="p">
              Os dados vão de <Lowercase>{formatedStartDate}</Lowercase> a{' '}
              <Lowercase>{formatedEndDate}</Lowercase>. São dados de{' '}
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                {collecting.length}
              </Typography>{' '}
              órgãos que compreendem{' '}
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                {recordAmount}
              </Typography>{' '}
              registros de pagamentos de salários, indenizações, gratificações e
              diárias, totalizando{' '}
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                R$ {(finalValue / 1000000000).toFixed(2)} bilhões
              </Typography>{' '}
              em recursos públicos.
            </Typography>
          </Box>
          <Grid container spacing={2} display="flex" alignItems="center">
            {/* <Grid item xs={4} textAlign="center">
              <Button color="info" size="large" endIcon={<ArrowDownwardIcon />}>
                Índice de transparência
              </Button>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Button color="info" size="large" endIcon={<ArrowDownwardIcon />}>
                Dados gerais
              </Button>
            </Grid> */}
            <Grid item>
              <Typography variant="h6">Navegue pelos dados</Typography>
            </Grid>
            <Grid item>
              <DropDownGroupSelector />
            </Grid>
            <Grid item>
              <Typography variant="h6" pl={1}>
                ou faça uma
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                href="/pesquisar"
                startIcon={<SearchIcon />}
              >
                Pesquisa avançada
              </Button>
            </Grid>
          </Grid>
        </Headline>
      </Container>
      <ThemeProvider theme={light}>
        <Paper elevation={0} square>
          <Container>
            <Box my={4} pt={8} pb={4}>
              <Typography variant="h2" textAlign="center">
                Índice de Transparência
              </Typography>
              <Grid container justifyContent="center" py={4}>
                <Grid item width={692}>
                  <p>
                    O Índice de Transparência é composto por duas dimensões:
                    facilidade e completude. Cada uma das dimensões, por sua
                    vez, é composta por até seis critérios em cada prestação de
                    contas, que são avaliados mês a mês. O índice corresponde à
                    média harmônica das duas dimensões.{' '}
                    <Link href="/indice" color="inherit">
                      Saiba mais
                    </Link>
                    .
                  </p>
                  <p>
                    Este gráfico representa dados de <b>janeiro de 2018</b> até{' '}
                    <b>novembro de 2022</b> e foi gerado em{' '}
                    <b>24 de dezembro de 2022</b>
                  </p>
                </Grid>
                <Grid item width={900}>
                  <Grid container justifyContent="center" pt={4} pb={2}>
                    <Grid item>
                      <Box sx={{ maxWidth: { xs: 320, sm: 720 } }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          aria-label="Gráfico do índice de transparêncai"
                        >
                          <Tab label="Justiça estadual" {...a11yProps(0)} />
                          <Tab label="Ministérios públicos" {...a11yProps(1)} />
                          <Tab label="Justiça do trabalho" {...a11yProps(2)} />
                          <Tab label="Justiça militar" {...a11yProps(3)} />
                          <Tab label="Justiça federal" {...a11yProps(4)} />
                          <Tab label="Justiça Superior" {...a11yProps(5)} />
                        </Tabs>
                      </Box>
                    </Grid>
                  </Grid>
                  <TabPanel value={value} index={0}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-tj.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-mp.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-trt.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-tjm.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-trf.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <IndexChartLegend />
                    <img
                      src="https://raw.githubusercontent.com/dadosjusbr/acompanhamento-dados/main/figure/indice-transparencia-superiores.svg"
                      alt="Índice de transparência"
                      width="100%"
                    />
                  </TabPanel>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Paper>
        <Container>
          <Box my={12}>
            <Typography variant="h2" textAlign="center">
              Total das remunerações dos membros dos Tribunais de Justiça e
              Ministérios Públicos
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
                agency={null}
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
    const { data } = await api.ui.get('/v2/geral/resumo');
    const res = await api.default.get('/orgaos');
    return {
      props: {
        agencyAmount: data.num_orgaos,
        startDate: data.data_inicio,
        endDate: data.data_fim,
        recordAmount: `${data.num_meses_coletados}`,
        finalValue: `${data.remuneracao_total}`,
        ais: res.data,
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
  margin-bottom: 4rem;
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
    padding-right: 20rem;
    font-size: 2rem;
  }
`;
const Lowercase = styled.span`
  text-transform: lowercase;
`;
