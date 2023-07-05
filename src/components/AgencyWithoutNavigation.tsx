import React, { Suspense, useState } from 'react';
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
  Tooltip,
  Link,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ShareModal from './ShareModal';
import light from '../styles/theme-light';
import { formatAgency } from '../functions/format';
import Drawer from './Drawer';

const AnnualRemunerationGraph = dynamic(
  () => import('./AnnualRemunerationGraph'),
  { loading: () => <CircularProgress />, ssr: false },
);

const IndexTabGraph = dynamic(
  () => import('./TransparencyChart/IndexTabChart'),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  },
);

export interface AgencyPageWithoutNavigationProps {
  id: string;
  year: number;
  agency: Agency;
  title: string;
  data: AnnualSummaryData[];
  dataLoading: boolean;
  plotData: AggregateIndexes[];
}

const AgencyPageWithoutNavigation: React.FC<
  AgencyPageWithoutNavigationProps
> = ({ id, title, year, agency, data, dataLoading, plotData }) => {
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
          <AnnualRemunerationGraph
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
          />
        </Box>

        <Box mt={2}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="#000">
                Índice de transparência
                <Tooltip
                  placement="bottom"
                  title={
                    <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
                      O Índice de Transparência é composto por duas dimensões:
                      facilidade e completude. Cada uma das dimensões, por sua
                      vez, é composta por até seis critérios em cada prestação
                      de contas, que são avaliados mês a mês. O índice
                      corresponde à média harmônica das duas dimensões.{' '}
                      <Link href="/indice" color="inherit">
                        Saiba mais
                      </Link>
                      .
                    </Typography>
                  }
                >
                  <IconButton aria-label="Botão de informações">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Suspense fallback={<CircularProgress />}>
                <IndexTabGraph
                  plotData={plotData}
                  height={55 * plotData.length}
                  mobileHeight={110 * plotData.length}
                  isAgency
                />
              </Suspense>
            </AccordionDetails>
          </Accordion>
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
