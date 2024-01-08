/* eslint-disable */
import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Container, Box, Typography, Grid, Link, Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactGA from 'react-ga4';

import Footer from '../components/Essentials/Footer';
import Nav from '../components/Essentials/Header';
import api from '../services/api';
import Search from '../components/Search';
import ShareModal from '../components/Common/ShareModal';
import { getCurrentYear } from '../functions/currentYear';
import { searchHandleClick } from '../functions/query';
import { months } from '../@types/MONTHS';
import { getSearchUrlParameter } from '../functions/url';
import { useDownloadDump } from '../hooks/useDownloadDump';
import DownloadDumpDialog from '../components/Common/DownloadDumpDialog';

export default function Index({ ais }: { ais: Agency[] }) {
  const years: number[] = [];
  for (let i = getCurrentYear(); i >= 2018; i--) {
    years.push(i);
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const [fileLink, dumpDate] = useDownloadDump();

  const [selectedYears, setSelectedYears] = React.useState(getCurrentYear());
  const [selectedMonths, setSelectedMonths] = React.useState(months);
  const [selectedAgencies, setSelectedAgencies] = React.useState<Agency[]>([]);
  const [agencies, setAgencies] = React.useState<Agency[]>(ais);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState('Tudo');
  const [category, setCategory] = React.useState('Tudo');
  const [showResults, setShowResults] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [downloadAvailable, setDownloadAvailable] = React.useState(false);
  const [downloadLimit, setDownloadLimit] = React.useState(100000);
  const [numRowsIfAvailable, setNumRowsIfAvailable] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const isFirstRender = React.useRef(true);

  const clearSearch = () => {
    setSelectedYears(getCurrentYear());
    setSelectedMonths([]);
    setSelectedAgencies([]);
    setType('Tudo');
    setCategory('Tudo');
    setShowResults(false);
  };

  const firstRequest = async () => {
    setLoading(true);
    setShowResults(false);
    try {
      setQuery(location.search);
      const res = await api.ui.get(`/v2/pesquisar${location.search}`);
      const data = res.data.result.map((d, i) => {
        const item = d;
        item.id = i + 1;
        return item;
      });
      setResult(data);
      setDownloadAvailable(res.data.download_available);
      setDownloadLimit(res.data.download_limit);
      setNumRowsIfAvailable(res.data.num_rows_if_available);
      setShowResults(true);
    } catch (error) {
      setResult([]);
      setDownloadAvailable(false);
      setShowResults(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setSelectedYears(getSearchUrlParameter('anos') as number);
    setSelectedMonths(getSearchUrlParameter('meses') as Month[]);
    setCategory(getSearchUrlParameter('categorias') as string);
    setAgencies(getSearchUrlParameter('orgaos', ais) as Agency[]);
    location.search !== '' && firstRequest();
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const url = new URL(window.location.href);
    const params = url.searchParams;
    params.set('anos', selectedYears != null ? selectedYears.toString() : '');
    params.set('meses', selectedMonths.map(m => String(m.value)).join(','));
    params.set('orgaos', selectedAgencies.map(a => a.id_orgao).join(','));
    params.set(
      'categorias',
      category
        .split(' ')
        .at(category === 'Remuneração base' ? -1 : 0)
        .toLowerCase(),
    );
    window.history.replaceState({}, '', `${url}`);
  }, [selectedYears, selectedMonths, selectedAgencies, category]);

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
      <Nav />
      <Container fixed>
        <Box py={4}>
          <Box pb={4}>
            <Typography variant="h1" textAlign="center" gutterBottom>
              Pesquisa de dados
            </Typography>
            <Typography variant="body1" gutterBottom>
              Use os campos abaixo para selecionar dados de remuneração de
              membros de TJs e MPs. É possível baixar planilhas com até{' '}
              {`${downloadLimit / 1000}`} mil linhas.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Search.YearsAutocomplete
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
                years={years}
              />
            </Grid>
            <Grid item xs={12}>
              <Search.MonthsAutocomplete
                selectedMonths={selectedMonths}
                setSelectedMonths={setSelectedMonths}
                months={months}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Search.AgencyTypeSelect
                type={type}
                ais={ais}
                setAgencies={setAgencies}
                setType={setType}
              />
            </Grid>
            <Grid item xs={12}>
              <Search.AgencyAutocomplete
                agencies={agencies}
                selectedAgencies={selectedAgencies}
                setSelectedAgencies={setSelectedAgencies}
              />
              <Typography variant="body2" pt={1} pl={1}>
                Listados apenas os{' '}
                <Link href="/status">órgãos monitorados</Link> pelo DadosJusBr.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Search.CategorySelect
                category={category}
                setCategory={setCategory}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} py={3}>
            <Grid item xs={12} sm={3}>
              <Search.Button
                loading={loading}
                onClick={() =>
                  searchHandleClick({
                    selectedYears,
                    years,
                    selectedMonths,
                    selectedAgencies,
                    category,
                    setLoading,
                    setResult,
                    setDownloadAvailable,
                    setNumRowsIfAvailable,
                    setShowResults,
                    setQuery,
                    setDownloadLimit,
                  })
                }
                startIcon={<SearchOutlinedIcon />}
              >
                Pesquisar
              </Search.Button>
            </Grid>
            <Grid item xs={12} sm={9} display="flex" justifyContent="right">
              <Search.Button
                startIcon={<SearchOffOutlinedIcon />}
                onClick={clearSearch}
              >
                Limpar pesquisa
              </Search.Button>
            </Grid>
          </Grid>
          <Search.Result
            buttonColorScheme="info"
            loading={loading}
            showResults={showResults}
            numRowsIfAvailable={numRowsIfAvailable}
            downloadAvailable={downloadAvailable}
            downloadLimit={downloadLimit}
            result={result}
            setModalIsOpen={setModalIsOpen}
            downloadButton={
              <Button
                variant="outlined"
                endIcon={<CloudDownloadIcon />}
                disabled={!downloadAvailable}
                onClick={() => {
                  ReactGA.event('file_download', {
                    category: 'download',
                    action: `From: ${window.location.pathname}`,
                  });
                }}
                href={`${process.env.API_BASE_URL}/v2/download${query}`}
                id="download-button"
              >
                BAIXAR DADOS
              </Button>
            }
          />
          {showResults && (
            <Box mt={4} display="flex" flexDirection="row-reverse">
              <Button
                variant="outlined"
                color="info"
                onClick={() => setOpenDialog(true)}
                endIcon={<CloudDownloadIcon />}
              >
                <Typography variant="button" mr={1}>
                  BAIXAR
                </Typography>
                <Typography variant="button" color="#00bfa6">
                  {dumpDate}
                </Typography>
              </Button>
              <DownloadDumpDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fileLink={fileLink}
              />
            </Box>
          )}
        </Box>
        <ShareModal
          isOpen={modalIsOpen}
          url={`https://dadosjusbr.org/pesquisar${query}`}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </Container>
      <Footer />
    </Page>
  );
}

export async function getStaticProps() {
  try {
    const res = await api.default.get('/orgaos');
    const agencies: Agency[] = res.data.filter(
      ag => ag.coletando == null || ag.coletando[0].coletando == true,
    );
    return {
      props: {
        ais: agencies,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (err) {
    return {
      props: {
        ais: [],
      },
    };
  }
}

const Page = styled.div`
  background: #3e5363;
`;
