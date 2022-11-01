import * as React from 'react';
import ReactGA from 'react-ga';
import Head from 'next/head';
import styled from 'styled-components';
import {
  Container,
  Box,
  Typography,
  TextField,
  Autocomplete,
  Checkbox,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Button,
  CircularProgress,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import IosShareIcon from '@mui/icons-material/IosShare';
import { ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

import Footer from '../components/Footer';
import Nav from '../components/Header';
import light from '../styles/theme-light';
import api from '../services/api';
import { monthsInQuarter } from 'date-fns/esm/fp';
import ShareModal from '../components/ShareModal';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const columns: GridColDef[] = [
  { field: 'id', headerName: '#', width: 50 },
  { field: 'orgao', headerName: 'Órgão', width: 70 },
  { field: 'mes', headerName: 'Mês', width: 70 },
  { field: 'ano', headerName: 'Ano', width: 70 },
  { field: 'matricula', headerName: 'Matrícula', width: 90 },
  { field: 'nome', headerName: 'Nome', width: 200 },
  { field: 'cargo', headerName: 'Cargo', width: 150 },
  { field: 'lotacao', headerName: 'Lotação', width: 150 },
  {
    field: 'categoria_contracheque',
    headerName: 'Categoria de remuneração',
    width: 90,
  },
  {
    field: 'detalhamento_contracheque',
    headerName: 'Descrição de remuneração',
    width: 150,
  },
  { field: 'valor', headerName: 'Valor', width: 120 },
];

export default function Index({ ais }) {
  const years = [];
  for (let i = 2022; i >= 2018; i--) {
    years.push(i);
  }
  const months = [
    { name: 'Jan', value: 1 },
    { name: 'Fev', value: 2 },
    { name: 'Mar', value: 3 },
    { name: 'Abr', value: 4 },
    { name: 'Mai', value: 5 },
    { name: 'Jun', value: 6 },
    { name: 'Jul', value: 7 },
    { name: 'Ago', value: 8 },
    { name: 'Set', value: 9 },
    { name: 'Out', value: 10 },
    { name: 'Nov', value: 11 },
    { name: 'Dez', value: 12 },
  ];

  const [selectedYears, setSelectedYears] = React.useState(2022);
  const [selectedMonths, setSelectedMonths] = React.useState(months);
  const [selectedAgencies, setSelectedAgencies] = React.useState([]);
  const [agencies, setAgencies] = React.useState(ais);
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

  const clearSearch = () => {
    setSelectedYears(2022);
    setSelectedMonths([]);
    setSelectedAgencies([]);
    setType('Tudo');
    setCategory('Tudo');
    setShowResults(false);
  };

  const makeQueryFromList = (word: string, list: Array<string>) => {
    if (list.length === 0) {
      return '';
    }
    let q = '&';
    q += `${word}=`;
    list.forEach(item => {
      q += `${item},`;
    });
    q = q.slice(0, -1);
    return q;
  };
  const makeQueryFromValue = (
    word: string,
    value: string,
    values: Array<string>,
    equivalents: Array<string>,
  ) => {
    if (!value) return '';
    for (let i = 0; i < values.length; i++) {
      if (value === values[i]) {
        if (!equivalents[i]) return '';
        return `&${word}=${equivalents[i]}`;
      }
    }
    return ``;
  };

  const searchHandleClick = async () => {
    setLoading(true);
    setShowResults(false);
    try {
      let q = '?';
      const qSelectedYears = makeQueryFromValue(
        'anos',
        selectedYears.toString(),
        years.map(y => y.toString()),
        years.map(y => y.toString()),
      );
      const qSelectedMonths = makeQueryFromList(
        'meses',
        selectedMonths.map(m => String(m.value)),
      );
      // O tipo está sendo usado apenas para filtro dos órgãos na interface
      // const qType = makeQueryFromValue(
      //   'tipos',
      //   type,
      //   ['Ministérios Públicos', 'Tribunais de Justiça', 'Tudo'],
      //   ['mp', 'tj', ''],
      // );
      const qSelectedAgencies = makeQueryFromList(
        'orgaos',
        selectedAgencies.map(m => m.aid),
      );
      const qCategories = makeQueryFromValue(
        'categorias',
        category,
        ['Remuneração base', 'Outras remunerações', 'Descontos', 'Tudo'],
        ['base', 'outras', 'descontos', ''],
      );
      q = `${q}${qSelectedYears}${qSelectedMonths}${qSelectedAgencies}${qCategories}`;
      setQuery(q);
      const res = await api.ui.get(`/v2/pesquisar${q}`);
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
    } catch (err) {
      setResult([]);
      setDownloadAvailable(false);
      setShowResults(false);
    }
    setLoading(false);
  };

  const monthsHandleChange = newValue => {
    setSelectedMonths(newValue);
  };

  const typeHandleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    if (event.target.value === 'Ministérios Públicos') {
      setAgencies(ais.filter(a => a.entity === 'Ministério'));
    } else if (event.target.value === 'Tribunais de Justiça') {
      setAgencies(ais.filter(a => a.entity === 'Tribunal'));
    } else {
      setAgencies(ais);
    }
  };

  const categoryHandleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    switch (event.target.value) {
      case 'Remuneração base':
        insertUrlParam('categorias', 'base');
        break;

      case 'Outras remunerações':
        insertUrlParam('categorias', 'outras');
        break;

      case 'Descontos':
        insertUrlParam('categorias', 'descontos');
        break;

      case 'Tudo':
        deleteUrlParam('categorias');

      default:
        break;
    }
  };

  const agencyFilterOptions = createFilterOptions({
    stringify: (option: AgencyOptionType) => option.aid + option.name,
  });

  function insertUrlParam(key, value) {
    if (history.pushState) {
      let searchParams = new URLSearchParams(window.location.search);
      if (typeof value === 'object') {
        if (key === 'meses') {
          value = value
            .map(v => v.value)
            .join(',')
            .split(',');
          searchParams.set(key, value.toString());
        } else if (key === 'orgaos') {
          searchParams.set(key, value.map(v => v.aid).toString());
        }
      } else {
        searchParams.set(key, value);
      }
      let newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?' +
        searchParams.toString();
      window.history.pushState({ path: newurl }, '', newurl);
    }
  }

  const deleteUrlParam = key => {
    if (history.pushState) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(key);
      let newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?' +
        searchParams.toString();
      window.history.pushState({ path: newurl }, '', newurl);
    }
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
            : 2022,
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
          return ais.find(a => a.aid === o);
        });
        setSelectedAgencies(orgaosSelecionados);
        return orgaosSelecionados;
    }
  }

  React.useEffect(() => {
    getUrlParameter('anos');
    getUrlParameter('meses');
    getUrlParameter('categorias');
    getUrlParameter('orgaos');

    location.search != '' && firstRequest();
  }, []);

  interface AgencyOptionType {
    aid: string;
    name: string;
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
              <Autocomplete
                id="autocomplete-anos"
                options={years}
                getOptionLabel={option => `${option}`}
                value={selectedYears}
                onChange={(event, newValue) => {
                  setSelectedYears(newValue);
                  insertUrlParam(
                    'anos',
                    newValue
                      .toString()
                      .toLowerCase()
                      .split(' ')
                      .join('_')
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, ''),
                  );
                }}
                renderOption={(props, option) => (
                  <MenuItem key={option} {...props} value={option}>
                    {option}
                  </MenuItem>
                )}
                renderInput={params => <TextField {...params} label="Ano" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="autocomplete-meses"
                options={months}
                disableCloseOnSelect
                getOptionLabel={option => option.name}
                value={selectedMonths}
                onChange={(event, newValue) => {
                  monthsHandleChange(newValue);
                  insertUrlParam('meses', newValue);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={params => <TextField {...params} label="Meses" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de órgão
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Tipo de órgão"
                  onChange={typeHandleChange}
                >
                  <MenuItem value="Tudo" selected>
                    Tudo
                  </MenuItem>
                  <MenuItem value="Ministérios Públicos">
                    Ministérios Públicos
                  </MenuItem>
                  <MenuItem value="Tribunais de Justiça">
                    Tribunais de Justiça
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="autocomplete-orgaos"
                options={agencies}
                disableCloseOnSelect
                getOptionLabel={option => option.aid}
                value={selectedAgencies}
                onChange={(event, newValue) => {
                  if (
                    selectedAgencies.length < 3 &&
                    event.target['localName'] == 'li'
                  ) {
                    setSelectedAgencies(newValue);
                    if (newValue.length > 0) {
                      insertUrlParam('orgaos', newValue);
                    } else {
                      deleteUrlParam('orgaos');
                    }
                  } else if (
                    selectedAgencies.length <= 3 &&
                    (event.target['localName'] == 'svg' ||
                      event.target['localName'] == 'path')
                  ) {
                    setSelectedAgencies(newValue);
                    if (newValue.length > 0) {
                      insertUrlParam('orgaos', newValue);
                    } else {
                      deleteUrlParam('orgaos');
                    }
                  }
                }}
                isOptionEqualToValue={(option, value) =>
                  option.aid === value.aid
                }
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                renderInput={params => <TextField {...params} label="Órgãos" />}
                filterOptions={agencyFilterOptions}
              />
              <Typography variant="body2" pt={1} pl={1}>
                Listados apenas os{' '}
                <Link href="/status">órgãos monitorados</Link> pelo DadosJusBr.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categoria de remuneração
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Categoria de remuneração"
                  onChange={categoryHandleChange}
                >
                  <MenuItem value="Tudo">Tudo</MenuItem>
                  <MenuItem value="Remuneração base">Remuneração base</MenuItem>
                  <MenuItem value="Outras remunerações">
                    Outras remunerações
                  </MenuItem>
                  <MenuItem value="Descontos">Descontos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} py={3}>
            <Grid item xs={12} sm={3}>
              <LoadingButton
                size="large"
                onClick={searchHandleClick}
                loading={loading}
                variant="outlined"
                startIcon={<SearchOutlinedIcon />}
              >
                Pesquisar
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sm={9} display="flex" justifyContent="right">
              <LoadingButton
                size="large"
                onClick={clearSearch}
                variant="outlined"
                startIcon={<SearchOffOutlinedIcon />}
              >
                Limpar pesquisa
              </LoadingButton>
            </Grid>
          </Grid>
          {loading && (
            <Box
              m={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div>
                <CircularProgress color="info" />
              </div>
              <p>Aguarde...</p>
            </Box>
          )}
          {showResults && (
            <Box>
              <Box
                pt={4}
                sx={{
                  borderTop: '2px solid',
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Resultados
                </Typography>
                {numRowsIfAvailable === 0 && (
                  <Typography variant="body1" gutterBottom>
                    O órgão não prestou contas neste período.
                  </Typography>
                )}
                {numRowsIfAvailable > 0 && (
                  <Box>
                    {!downloadAvailable && (
                      <ThemeProvider theme={light}>
                        <Alert severity="warning">
                          <Typography variant="body1" gutterBottom>
                            A pesquisa retorna mais linhas que o número máximo
                            permitido para download ({`${downloadLimit / 1000}`}
                            {` `}
                            mil).
                            <br />
                            Refaça a sua busca com menos órgãos ou com um
                            período mais curto.
                            <br />
                            Abaixo, uma amostra dos dados:
                          </Typography>
                        </Alert>
                      </ThemeProvider>
                    )}
                    {downloadAvailable && (
                      <Typography variant="body1" gutterBottom>
                        A pesquisa retornou{' '}
                        <strong>{numRowsIfAvailable}</strong> linhas. Abaixo,
                        uma amostra dos dados:
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
              <Box py={4} textAlign="right">
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  color="info"
                  endIcon={<IosShareIcon />}
                  onClick={() => setModalIsOpen(true)}
                >
                  COMPARTILHAR
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<CloudDownloadIcon />}
                  disabled={!downloadAvailable}
                  onClick={() => {
                    ReactGA.pageview(`${process.env.API_BASE_URL}/v2/download`);
                  }}
                  href={`${process.env.API_BASE_URL}/v2/download${query}`}
                  id="download-button"
                >
                  BAIXAR DADOS
                </Button>
              </Box>
              {numRowsIfAvailable > 0 && (
                <ThemeProvider theme={light}>
                  <Paper>
                    <Box sx={{ width: '100%' }}>
                      <DataGrid
                        rows={result}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        rowHeight={35}
                        autoHeight
                      />
                    </Box>
                  </Paper>
                </ThemeProvider>
              )}
              <Box py={4} textAlign="right">
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  color="info"
                  endIcon={<IosShareIcon />}
                  onClick={() => setModalIsOpen(true)}
                >
                  COMPARTILHAR
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<CloudDownloadIcon />}
                  disabled={!downloadAvailable}
                  onClick={() => {
                    ReactGA.pageview(`${process.env.API_BASE_URL}/v2/download`);
                  }}
                  href={`${process.env.API_BASE_URL}/v2/download${query}`}
                  id="download-button"
                >
                  BAIXAR DADOS
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <ShareModal
          isOpen={modalIsOpen}
          url={`dadosjusbr.org/pesquisar${query}`}
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
    const agencies = res.data.filter(ag => ag.collecting === null);
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
