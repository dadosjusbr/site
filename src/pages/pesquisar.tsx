/* eslint-disable */
import * as React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Container, Box, Typography, Grid, Link } from '@mui/material';

import Footer from '../components/Essentials/Footer';
import Nav from '../components/Essentials/Header';
import api from '../services/api';
import Search from '../components/Search';
import ShareModal from '../components/Common/ShareModal';
import { getCurrentYear } from '../functions/currentYear';
import { searchHandleClick } from '../functions/query';
import { months } from '../@types/MONTHS';

export default function Index({ ais }: { ais: Agency[] }) {
  const years: number[] = [];
  for (let i = getCurrentYear(); i >= 2018; i--) {
    years.push(i);
  }

  const [selectedYears, setSelectedYears] = React.useState(getCurrentYear());
  const [selectedMonths, setSelectedMonths] = React.useState(months);
  const [selectedAgencies, setSelectedAgencies] = React.useState([]);
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

  function getUrlParameter(paramKey) {
    const url = window.location.href;
    var r = new URL(url);
    switch (paramKey) {
      case 'anos':
        setSelectedYears(
          r.searchParams.get(paramKey)
            ? parseInt(r.searchParams.get(paramKey), 10)
            : getCurrentYear(),
        );
        return +r.searchParams.get(paramKey);

      case 'meses':
        const meses = r.searchParams.get(paramKey)
          ? r.searchParams.get(paramKey).split(',')
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const mesesSelecionados = meses.map(m => {
          return { label: months[parseInt(m, 10) - 1] };
        });

        setSelectedMonths(mesesSelecionados.map(m => m.label));
        return mesesSelecionados.map(m => m.label.value);

      case 'categorias':
        switch (r.searchParams.get(paramKey)) {
          case 'descontos':
            setCategory('Descontos');
            return 'descontos';

          case 'base':
            setCategory('Remuneração base');
            return 'base';

          case 'outras':
            setCategory('Outras remunerações');
            return 'outras';

          case 'Tudo':
            setCategory('Tudo');
            return 'Tudo';

          default:
            break;
        }
        break;

      case 'orgaos':
        const orgaos = r.searchParams.get(paramKey)
          ? r.searchParams.get(paramKey).split(',')
          : [];
        const orgaosSelecionados = orgaos.map(o => {
          return ais.find(a => a.id_orgao === o);
        });
        setSelectedAgencies(orgaosSelecionados);
        return orgaosSelecionados;

      default:
        break;
    }
  }

  React.useEffect(() => {
    getUrlParameter('anos');
    getUrlParameter('meses');
    getUrlParameter('categorias');
    getUrlParameter('orgaos');
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
              <Search.SearchButton
                loading={loading}
                searchHandleClick={() =>
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
              />
            </Grid>
            <Grid item xs={12} sm={9} display="flex" justifyContent="right">
              <Search.ClearButton clearSearch={clearSearch} />
            </Grid>
          </Grid>
          <Search.Result
            loading={loading}
            showResults={showResults}
            numRowsIfAvailable={numRowsIfAvailable}
            downloadAvailable={downloadAvailable}
            downloadLimit={downloadLimit}
            result={result}
            query={query}
            setModalIsOpen={setModalIsOpen}
          />
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

export async function getServerSideProps() {
  try {
    const res = await api.default.get('/orgaos');
    const agencies: Agency[] = res.data.filter(
      ag => ag.collecting == null || ag.collecting[0].collecting == true,
    );
    return {
      props: {
        ais: agencies,
      },
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
