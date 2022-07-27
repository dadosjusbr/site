import * as React from 'react';
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
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: 'Noname', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
  const [selectedYears, setSelectedYears] = React.useState([2021]);
  const [selectedMonths, setSelectedMonths] = React.useState([]);
  const [selectedAgencies, setSelectedAgencies] = React.useState([]);
  const [agencies, setAgencies] = React.useState(ais);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState('Tudo');
  const [category, setCategory] = React.useState('Tudo');
  const [showResults, setShowResults] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [count, setCount] = React.useState(0);
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
      const qType = makeQueryFromValue(
        'tipos',
        type,
        ['Ministérios Públicos', 'Tribunais de Justiça', 'Tudo'],
        ['mp', 'tj', ''],
      );
      const qSelectedAgencies = makeQueryFromList(
        'orgaos',
        selectedAgencies.map(m => m.aid),
      );
      const qCategories = makeQueryFromValue(
        'categorias',
        category,
        ['Remuneração básica', 'Benefícios e indenizações', 'Tudo'],
        ['contracheque', 'outras', ''],
      );
      q = `${q}${qSelectedYears}${qSelectedMonths}${qType}${qSelectedAgencies}${qCategories}`;
      setQuery(q);
      const res = await api.ui.get(`/v2/pesquisar${q}`);
      setResult(res.data.result);
      setCount(res.data.count);
      setShowResults(true);
    } catch (err) {
      setResult([]);
      setCount(0);
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
                id="checkboxes-tags-demo"
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
                id="checkboxes-tags-demo"
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
                id="checkboxes-tags-demo"
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
                  <MenuItem value="Remuneração básica">
                    Remuneração básica
                  </MenuItem>
                  <MenuItem value="Benefícios e indenizações">
                    Benefícios e indenizações
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={3}>
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
          <div>
            <Box py={4}>
              <Typography variant="h3" gutterBottom>
                Resultados encontrados
              </Typography>
            </Box>
            <Grid container pb={4}>
              <Grid item xs={12} sm={3}>
                <Button
                  variant="outlined"
                  color="info"
                  endIcon={<CloudDownloadIcon />}
                  id="download-button"
                >
                  BAIXAR DADOS
                </Button>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1" textAlign="right" gutterBottom>
                  Monstrando <strong>100</strong> resultados de um total de{' '}
                  <strong>{count}</strong>.
                </Typography>
              </Grid>
            </Grid>
            <ThemeProvider theme={light}>
              <Paper>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                  />
                </Box>
              </Paper>
            </ThemeProvider>
          </div>
        </Box>
      </Container>
      <Footer />
    </Page>
  );
}

export async function getServerSideProps() {
  try {
    const res = await api.default.get('/orgaos');
    return {
      props: {
        ais: res.data,
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
