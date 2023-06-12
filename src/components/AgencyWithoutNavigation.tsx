import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  Button,
  ThemeProvider,
  Stack,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import ShareModal from './ShareModal';
import light from '../styles/theme-light';
import { formatAgency } from '../functions/format';
import Drawer from './Drawer';

const AnualRemunerationGraph = dynamic(
  () => import('./AnnualRemunerationGraph'),
  { loading: () => <CircularProgress />, ssr: false },
);

export interface AgencyPageWithoutNavigationProps {
  id: string;
  year: number;
  agency: Agency;
  title: string;
  data: AnnualSummaryData[];
  dataLoading: boolean;
}

const AgencyPageWithoutNavigation: React.FC<
  AgencyPageWithoutNavigationProps
> = ({ id, title, year, agency, data, dataLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  return (
    <Container fixed sx={{ mb: 12 }}>
      <Box>
        <Typography variant="h2" textAlign="center">
          {title} ({formatAgency(id.toLocaleUpperCase('pt'))})
        </Typography>
        {agency && agency.coletando && !agency.possui_dados ? (
          <></>
        ) : (
          <>
            {!matches ? (
              <Box display="flex" justifyContent="space-between">
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  my={4}
                >
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.back()}
                  >
                    VOLTAR
                  </Button>
                </Stack>

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
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(`/pesquisar?orgaos=${agency.id_orgao}`);
                    }}
                  >
                    PESQUISAR
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Drawer>
                <Stack
                  direction="column"
                  spacing={1}
                  justifyContent="flex-start"
                  mt={3}
                  mx={6}
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
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(`/pesquisar?orgaos=${agency.id_orgao}`);
                    }}
                  >
                    PESQUISAR
                  </Button>
                </Stack>
              </Drawer>
            )}
          </>
        )}
      </Box>
      <ThemeProvider theme={light}>
        <Box>
          <AnualRemunerationGraph
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
          />
        </Box>
      </ThemeProvider>

      <ShareModal
        isOpen={modalIsOpen}
        url={`https://dadosjusbr.org/orgao/${id}`}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </Container>
  );
};

export default AgencyPageWithoutNavigation;
