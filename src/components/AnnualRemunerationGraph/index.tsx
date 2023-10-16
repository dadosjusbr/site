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
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ShareModal from '../Common/ShareModal';
import light from '../../styles/theme-light';
import { formatAgency } from '../../functions/format';
import Drawer from '../Common/Drawer';
import MoreInfoAccordion from '../Common/MoreInfoAccordion';
import SearchAccordion from './components/AnnualSearchAccordion';
import api from '../../services/api';
import { normalizePlotData } from '../../functions/normalize';

const AnnualRemunerationGraph = dynamic(
  () => import('./components/RemunerationChart'),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  },
);

const IndexTabGraph = dynamic(
  () => import('../TransparencyChart/IndexTabChart'),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  },
);

export interface AgencyPageWithoutNavigationProps {
  id: string;
  agencyTotals: v2AgencyTotalsYear;
  year: number;
  agency: Agency;
  title: string;
  data: AnnualSummaryData[];
  dataLoading: boolean;
}

const AgencyPageWithoutNavigation: React.FC<
  AgencyPageWithoutNavigationProps
> = ({ id, agencyTotals, title, year, agency, data, dataLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [plotData, setPlotData] = useState<AggregateIndexes[]>([]);
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  async function fetchPlotData() {
    if (!plotData.length) {
      try {
        const { data: transparencyPlot } = await api.default.get(
          `/indice/orgao/${id}`,
        );
        setPlotData(normalizePlotData(transparencyPlot));
      } catch (err) {
        router.push('/404');
      }
    }
  }

  return (
    <Container fixed>
      <Box>
        <MoreInfoAccordion
          ombudsman={agency?.ouvidoria}
          twitterHandle={agency?.twitter_handle}
          timestamp={agencyTotals?.meses?.at(-1).timestamp.seconds}
          repository=""
        >
          <Typography variant="h2" textAlign="center" width="100%">
            {title} ({formatAgency(id.toLocaleUpperCase('pt'))})
          </Typography>
        </MoreInfoAccordion>
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
        {(!agency?.coletando && !agency?.possui_dados) ||
        (agency?.coletando && agency?.possui_dados) ? (
          <Box mt={2}>
            <Accordion onChange={fetchPlotData}>
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
                  {plotData.length > 0 ? (
                    <IndexTabGraph
                      plotData={plotData}
                      height={60 * plotData.length}
                      mobileHeight={95 * plotData.length}
                      isAgency
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </Suspense>
              </AccordionDetails>
            </Accordion>
          </Box>
        ) : null}
        <Box mt={2}>
          {agency && <SearchAccordion selectedAgencies={[agency]} />}
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
