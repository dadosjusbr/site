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

export default function Index() {
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
  const ags = [
    {
      aid: 'tjpb',
      name: 'Tribunal de Justiça do Estado da Paraíba',
      type: 'Estadual',
      entity: 'Tribunal',
      uf: 'PB',
      url: 'v1/orgao/tjpb',
      collecting: null,
    },
    {
      aid: 'tjrs',
      name: 'Tribunal de Justiça do Estado do Rio Grande do Sul',
      type: 'Estadual',
      entity: 'Tribunal',
      uf: 'RS',
      url: 'v1/orgao/tjrs',
      collecting: null,
    },
    {
      aid: 'tjes',
      name: 'Tribunal de Justiça do Estado do Espírito Santo',
      type: 'Estadual',
      entity: 'Tribunal',
      uf: 'ES',
      url: 'v1/orgao/tjes',
      collecting: null,
    },
    {
      aid: 'tjpe',
      name: 'Tribunal de Justiça de Pernambuco',
      type: 'Estadual',
      entity: 'Tribunal',
      uf: 'PE',
      url: 'v1/orgao/tjpe',
      collecting: null,
    },
  ];
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState('Tudo');
  const [category, setCategory] = React.useState('Tudo');

  function searchHandleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  const typeHandleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
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
                defaultValue={[2022]}
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
                options={ags}
                disableCloseOnSelect
                getOptionLabel={option => option.aid}
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
                onClick={searchHandleClick}
                loading={loading}
                variant="outlined"
                startIcon={<SearchOffOutlinedIcon />}
              >
                Limpar pesquisa
              </LoadingButton>
            </Grid>
          </Grid>
          <Box py={4}>
            <Typography variant="h3" gutterBottom>
              Resultados encontrados
            </Typography>
            <Typography variant="body1" gutterBottom>
              Texto de ajuda ainda não definido. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Quia explicabo dolorum, inventore
              qui animi minus dolorem accusantium dolore, culpa placeat fugit?
              Optio consequatur libero.
            </Typography>
          </Box>
          <Grid container pb={4}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="info"
                endIcon={<CloudDownloadIcon />}
                id="download-button"
              >
                BAIXAR DADOS
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" textAlign="right" gutterBottom>
                Monstrando <strong>xxx</strong> resultados de um total de{' '}
                <strong>yyyyyyy</strong>.
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
        </Box>
      </Container>
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
