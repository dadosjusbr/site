import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import ReactGA from 'react-ga4';
import dynamic from 'next/dynamic';
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
  CircularProgress,
  Button,
  Stack,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';

import Header from '../components/Essentials/Header';
import DropDownGroupSelector from '../components/Common/DropDownGroupSelector';
import api from '../services/api';
import MONTHS from '../@types/MONTHS';
import light from '../styles/theme-light';
import { getCurrentYear } from '../functions/currentYear';
import COLLECT_INFOS from '../@types/COLLECT_INFOS';
import ShareModal from '../components/Common/ShareModal';

const RemunerationBarGraph = dynamic(
  () =>
    import('../components/RemunerationBarGraph/components/RemunerationChart'),
  { loading: () => <CircularProgress /> },
);
const IndexTabGraph = dynamic(
  () => import('../components/TransparencyChart/IndexTabChart'),
  {
    loading: () => <CircularProgress />,
  },
);
const Footer = dynamic(() => import('../components/Essentials/Footer'));

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
}: {
  startDate: string;
  endDate: string;
  recordAmount: number;
  finalValue: number;
  ais: Agency[];
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
  const [plotData, setPlotData] = useState<any>([]);
  const [year, setYear] = useState(getCurrentYear());
  const [loading, setLoading] = useState(true);
  const [plotLoading, setPlotLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const fileLink = `https://dadosjusbr.org/download/dumps/dadosjusbr-${getCurrentYear()}-${createdAt.toLocaleDateString(
    'pt-BR',
    {
      month: 'numeric',
    },
  )}.zip`;
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  useEffect(() => {
    fetchGeneralChartData();
    const date = new Date(
      getCurrentYear(),
      new Date().getDate() <= COLLECT_INFOS.COLLECT_DATE
        ? new Date().getMonth() - 1
        : new Date().getMonth(),
      17,
    );

    setCreatedAt(date);
  }, [year]);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number,
  ) => {
    const agencyIndexes = [
      'estadual',
      'ministerios',
      'trabalho',
      'militar',
      'federal',
      'eleitoral',
      'superior',
      'conselhos',
    ];

    if (
      !Object.prototype.hasOwnProperty.call(plotData, agencyIndexes[newValue])
    ) {
      const agencyTypes = [
        'justica-estadual',
        'ministerios-publicos',
        'justica-do-trabalho',
        'justica-militar',
        'justica-federal',
        'justica-eleitoral',
        'justica-superior',
        'conselhos-de-justica',
      ];

      try {
        setPlotLoading(true);
        const { data } = await api.default.get(
          `indice/grupo/${agencyTypes[newValue]}?agregado=true`,
        );

        setPlotData({
          ...plotData,
          [agencyIndexes[newValue]]: data,
        });
        setPlotLoading(false);
      } catch (error) {
        setPlotData([error]);
      }
    }

    setValue(newValue);
  };
  async function fetchGeneralChartData() {
    try {
      const [{ data }, tabGraph]: [
        AxiosResponse<MensalRemuneration[]>,
        AxiosResponse<AggregateIndexes[]>,
      ] = await Promise.all([
        api.ui.get(`/v2/geral/remuneracao/${year}`),
        api.default.get('indice/grupo/justica-estadual?agregado=true'),
      ]);

      setPlotData({
        ...plotData,
        estadual: tabGraph.data,
      });

      setCompleteChartData(
        data.map(d => ({
          remuneracao_base: d.remuneracao_base,
          outras_remuneracoes: d.outras_remuneracoes,
          descontos: d.descontos,
          // eslint-disable-next-line no-underscore-dangle
          mes: d.mes,
        })),
      );
    } catch (error) {
      setCompleteChartData([]);
    }
    setLoading(false);
    setPlotLoading(false);
  }

  const collecting = ais.filter(ag => ag.coletando === undefined);

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
          Acesse as remunerações do Sistema de Justiça.
          <br />
          <Typography component="p" mt={2} textAlign="justify">
            Os dados vão de <Lowercase>{formatedStartDate}</Lowercase> a{' '}
            <Lowercase>{formatedEndDate}</Lowercase> e são provenientes de{' '}
            <Link href="/status">
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                {collecting.length}
              </Typography>{' '}
              órgãos
            </Link>{' '}
            que compreendem{' '}
            <Typography variant="inherit" component="span" color="success.main">
              {recordAmount}
            </Typography>{' '}
            registros de pagamentos de salários, indenizações, gratificações e
            diárias, totalizando{' '}
            <Typography variant="inherit" component="span" color="success.main">
              R$ {(finalValue / 1000000000).toFixed(2)} bilhões
            </Typography>{' '}
            em recursos públicos.
          </Typography>
          <Typography component="p" textAlign="justify">
            Você pode fazer o{' '}
            <Link href={fileLink}>
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                download
              </Typography>
            </Link>{' '}
            de todas as informações de remunerações da nossa base de dados!
          </Typography>
          <Grid
            container
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mt={8}
            pr={38}
          >
            <Grid item>
              <DropDownGroupSelector />
            </Grid>
            <Grid item>
              <Typography variant="h6">OU</Typography>
            </Grid>
            <Grid item borderBottom="2px solid #2fbb96" mt={1}>
              <Link
                href="/pesquisar"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                }}
                onClick={() => {
                  ReactGA.event('file_download', {
                    category: 'download',
                    action: `From: ${window.location.pathname}`,
                  });
                }}
              >
                <Typography ml={1} mr={2}>
                  PESQUISAR
                </Typography>
                <SearchIcon />
              </Link>
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
                    <b>{formatedEndDate.toLowerCase()}</b> e foi gerado em{' '}
                    <b>
                      {createdAt.toLocaleDateString('pt-BR', {
                        calendar: 'gregory',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </b>
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
                          aria-label="Gráfico do índice de transparência"
                        >
                          <Tab label="Justiça estadual" {...a11yProps(0)} />
                          <Tab label="Ministérios públicos" {...a11yProps(1)} />
                          <Tab label="Justiça do trabalho" {...a11yProps(2)} />
                          <Tab label="Justiça militar" {...a11yProps(3)} />
                          <Tab label="Justiça federal" {...a11yProps(4)} />
                          <Tab label="Justiça eleitoral" {...a11yProps(5)} />
                          <Tab label="Justiça Superior" {...a11yProps(6)} />
                          <Tab label="Conselhos de justiça" {...a11yProps(7)} />
                        </Tabs>
                      </Box>
                    </Grid>
                  </Grid>
                  {plotLoading ? (
                    <Grid container justifyContent="center">
                      <Grid item>
                        <CircularProgress />
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      <TabPanel value={value} index={0}>
                        <IndexTabGraph plotData={plotData.estadual} />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <IndexTabGraph plotData={plotData.ministerios} />
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <IndexTabGraph plotData={plotData.trabalho} />
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        <IndexTabGraph plotData={plotData.militar} />
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        <IndexTabGraph plotData={plotData.federal} />
                      </TabPanel>
                      <TabPanel value={value} index={5}>
                        <IndexTabGraph plotData={plotData.eleitoral} />
                      </TabPanel>
                      <TabPanel value={value} index={6}>
                        <IndexTabGraph plotData={plotData.superior} />
                      </TabPanel>
                      <TabPanel value={value} index={7}>
                        <IndexTabGraph plotData={plotData.conselhos} />
                      </TabPanel>
                    </>
                  )}
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
              <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                my={4}
              >
                <Button
                  variant="outlined"
                  color="info"
                  endIcon={<IosShareIcon />}
                  onClick={() => setModalIsOpen(true)}
                >
                  COMPARTILHAR
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  endIcon={<CloudDownloadIcon />}
                  onClick={() => {
                    ReactGA.event('file_download', {
                      category: 'download',
                      action: `From: ${window.location.pathname}`,
                    });
                  }}
                  href={fileLink}
                  id="download-button"
                >
                  <Typography variant="button" mr={1}>
                    BAIXAR
                  </Typography>
                  <Typography variant="button" color="#00bfa6">
                    {createdAt.toLocaleDateString('pt-BR', {
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </Typography>
                </Button>
              </Stack>
              <Box id="remuneration-graph">
                <RemunerationBarGraph
                  year={year}
                  agency={null}
                  data={completeChartData}
                  dataLoading={loading}
                />
              </Box>
            </Box>
          </Box>
          <ShareModal
            isOpen={modalIsOpen}
            url="https://dadosjusbr.org#remuneration-graph"
            onRequestClose={() => setModalIsOpen(false)}
          />
        </Container>
      </ThemeProvider>
      <Footer />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
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
  padding-top: 4rem;
  padding-bottom: 8rem;
  padding-right: 1rem;
  padding-left: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  background-image: url('img/bg.svg');
  background-position: right top;
  background-repeat: no-repeat;
  background-size: auto;
  @media (min-width: 600px) {
    padding-right: 0;
    padding-left: 0;
    font-size: 2rem;
  }
  @media (min-width: 900px) {
    padding-right: 22rem;
    font-size: 2.5rem;
  }
`;
const Lowercase = styled.span`
  text-transform: lowercase;
`;
