import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import light from '../../styles/theme-light';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from 'styled-components';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactGA from 'react-ga4';

type ResultProps = {
  loading: boolean;
  showResults: boolean;
  numRowsIfAvailable: number;
  downloadAvailable: boolean;
  downloadLimit: number;
  result: any[];
  query: string;
  setModalIsOpen: (isOpen: boolean) => void;
};

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

const Result = ({
  loading,
  showResults,
  numRowsIfAvailable,
  downloadAvailable,
  downloadLimit,
  result,
  query,
  setModalIsOpen,
}: ResultProps) => {
  return (
    <>
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
                        Refaça a sua busca com menos órgãos ou com um período
                        mais curto.
                        <br />
                        Abaixo, uma amostra dos dados:
                      </Typography>
                    </Alert>
                  </ThemeProvider>
                )}
                {downloadAvailable && (
                  <Typography variant="body1" gutterBottom>
                    A pesquisa retornou <strong>{numRowsIfAvailable}</strong>{' '}
                    linhas. Abaixo, uma amostra dos dados:
                  </Typography>
                )}
              </Box>
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
            </Box>
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
        </Box>
      )}
    </>
  );
};

export default Result;
