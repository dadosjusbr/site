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
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
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
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
  const [selectedYears, setSelectedYears] = React.useState([2022]);
  const [selectedMonths, setSelectedMonths] = React.useState([]);
  const [selectedAgencies, setSelectedAgencies] = React.useState([]);
  const [agencies, setAgencies] = React.useState(ais);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState('Tudo');
  const [category, setCategory] = React.useState('Tudo');
  const [showResults, setShowResults] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [downloadAvailable, setDownloadAvailable] = React.useState(false);
  const [downloadLimit, setDownloadLimit] = React.useState(0);
  const [searchLimit, setSearchLimit] = React.useState(0);
  const [numRowsIfAvailable, setNumRowsIfAvailable] = React.useState(0);
  const [query, setQuery] = React.useState('');

  const clearSearch = () => {
    setSelectedYears([2021]);
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
      const qSelectedYears = makeQueryFromList(
        'anos',
        selectedYears.map(y => String(y)),
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
      setSearchLimit(res.data.search_limit);
      setNumRowsIfAvailable(res.data.num_rows_if_available);
      setShowResults(true);
    } catch (err) {
      setResult([]);
      setDownloadAvailable(false);
      setShowResults(false);
    }
    setLoading(false);
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
  };

  const agencyFilterOptions = createFilterOptions({
    stringify: (option: AgencyOptionType) => option.aid + option.name,
  });

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
              Texto de ajuda ainda não definido. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quia explicabo dolorum, inventore
              qui animi minus dolorem accusantium dolore, culpa placeat fugit?
              Optio consequatur libero.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="autocomplete-anos"
                options={years}
                disableCloseOnSelect
                getOptionLabel={option => `${option}`}
                value={selectedYears}
                onChange={(event, newValue) => setSelectedYears(newValue)}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                renderInput={params => <TextField {...params} label="Anos" />}
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
                onChange={(event, newValue) => setSelectedMonths(newValue)}
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
                onChange={(event, newValue) => setSelectedAgencies(newValue)}
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
                    A pesquisa não encontrou resultados.
                  </Typography>
                )}
                {numRowsIfAvailable > 0 && (
                  <Box>
                    {!downloadAvailable && (
                      <Typography variant="body1" gutterBottom>
                        A pesquisa retorna mais linhas que o número máximo
                        permitido para download ({`${downloadLimit / 1000}mil`}
                        ). Abaixo, uma amostra dos dados:
                      </Typography>
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
              {downloadAvailable && (
                <Box pb={4} textAlign="right">
                  <Button
                    variant="outlined"
                    endIcon={<CloudDownloadIcon />}
                    onClick={() => {
                      ReactGA.pageview(
                        `${process.env.API_BASE_URL}/v2/download`,
                      );
                    }}
                    href={`${process.env.API_BASE_URL}/v2/download${query}`}
                    id="download-button"
                  >
                    BAIXAR DADOS
                  </Button>
                </Box>
              )}
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
              {downloadAvailable && (
                <Box py={4} textAlign="right">
                  <Button
                    variant="outlined"
                    endIcon={<CloudDownloadIcon />}
                    onClick={() => {
                      ReactGA.pageview(
                        `${process.env.API_BASE_URL}/v2/download`,
                      );
                    }}
                    href={`${process.env.API_BASE_URL}/v2/download${query}`}
                    id="download-button"
                  >
                    BAIXAR DADOS
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
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
