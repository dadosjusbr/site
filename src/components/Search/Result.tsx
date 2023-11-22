import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Button,
  Paper,
  ButtonProps,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import light from '../../styles/theme-light';
import { useDownloadDump } from '../../hooks/useDownloadDump';
import DownloadDumpDialog from '../Common/DownloadDumpDialog';

type ResultProps = {
  loading: boolean;
  showResults: boolean;
  numRowsIfAvailable: number;
  downloadAvailable: boolean;
  downloadLimit: number;
  result: SearchResult[];
  shareButtonProps?: ButtonProps;
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
  shareButtonProps,
  downloadButton,
  setModalIsOpen,
}: ResultProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [fileLink, dumpDate] = useDownloadDump();
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
                {...shareButtonProps}
                sx={{ mr: 2 }}
                variant="outlined"
                endIcon={<IosShareIcon />}
                onClick={() => setModalIsOpen(true)}
              >
                COMPARTILHAR
              </Button>
              {downloadButton}
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
        </Box>
      )}
    </>
  );
};

export default Result;
