import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Button,
  Paper,
  ButtonProps,
  Grid,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import IosShareIcon from '@mui/icons-material/IosShare';
import light from '../../styles/theme-light';
import Video from '../Video';

type ResultProps = {
  loading: boolean;
  showResults: boolean;
  numRowsIfAvailable: number;
  downloadAvailable: boolean;
  downloadLimit: number;
  result: SearchResult[];
  buttonColorScheme: ButtonProps['color'];
  downloadButton: React.ReactNode;
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
  buttonColorScheme,
  downloadButton,
  setModalIsOpen,
}: ResultProps) => (
  <>
    {loading && (
      <Box
        pt={4}
        sx={{
          display: 'flex',
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
                      Refaça a sua busca com menos órgãos ou com um período mais
                      curto.
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

          <Box>
            <Grid container justifyContent="space-evenly">
              <Grid item xs={12} md={3.5} mb={2}>
                <Video.Player
                  src="https://www.youtube-nocookie.com/embed/JElQeMFHDcM"
                  allowFullScreen
                  loading="lazy"
                  aria-label="Vídeo sobre a análise dos dados baixados no DadosJusBr"
                />
              </Grid>

              <Grid item xs={12} md={7} display="flex" alignItems="center">
                <Typography>
                  Na maioria das vezes, para analisar os dados baixados no
                  DadosJusBr, é necessário um software específico de planilhas,
                  como o Microsoft Excel ou o Google Sheets. Esses softwares
                  possuem uma variedade de ferramentas que permitem manipular,
                  analisar e visualizar os dados de maneira eficaz. Aqui, você
                  pode ver como fazer a importação dos dados baixados para esses
                  softwares e algumas configurações importantes que você pode
                  ajustar para realizar consultas mais precisas e assertivas aos
                  dados.
                </Typography>
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              mt={4}
              mb={2}
            >
              <Button
                color={buttonColorScheme}
                sx={{ mr: 0.7 }}
                variant="outlined"
                endIcon={<IosShareIcon />}
                onClick={() => setModalIsOpen(true)}
              >
                COMPARTILHAR
              </Button>

              {downloadButton}
            </Box>
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

export default Result;
