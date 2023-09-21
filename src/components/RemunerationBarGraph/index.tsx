import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';
import {
  Container,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  ThemeProvider,
  Stack,
  Accordion,
  AccordionSummary,
  Tooltip,
  AccordionDetails,
  CircularProgress,
  Link,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';

import ShareModal from '../Common/ShareModal';
import RemunerationBarGraph from './components/RemunerationChart';
import * as url from '../../url';
import light from '../../styles/theme-light';
import { formatAgency } from '../../functions/format';
import Drawer from '../Common/Drawer';
import IndexTabGraph from '../TransparencyChart/IndexTabChart';
import MoreInfoAccordion from '../Common/MoreInfoAccordion';
import SearchAccordion from './components/SearchAccordion';
import { getParameter } from '../../functions/url';

export interface AgencyPageWithNavigationProps {
  id: string;
  year: number;
  agencyInfo: AllAgencyInformation;
  agency: Agency;
  title: string;
  setYear: (y: number) => void;
  data: v2MonthTotals[];
  dataLoading: boolean;
  navigableMonth: number;
  summaryPackage?: Backup;
  plotData: AggregateIndexes[];
}

const AgencyPageWithNavigation: React.FC<AgencyPageWithNavigationProps> = ({
  id,
  agencyInfo,
  title,
  year,
  agency,
  setYear,
  data,
  dataLoading,
  navigableMonth,
  summaryPackage,
  plotData,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  const fileLink = `${process.env.S3_REPO_URL}/${id}/datapackage/${id}-${year}.zip`;
  const [devMode, setDevMode] = useState(false);
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / 1024 ** i).toFixed(dm))} ${sizes[i]}`;
  }

  useEffect(() => {
    setDevMode(Boolean(getParameter('dev_mode')));
  }, []);

  return (
    <Container fixed>
      <Box>
        <MoreInfoAccordion
          ombudsman={agencyInfo?.ouvidoria}
          twitterHandle={agencyInfo?.twitter_handle}
          timestamp={data?.map(d => d.timestamp.seconds).at(-1)}
          repository=""
        >
          <Typography
            variant="h2"
            title="Mais informações sobre o órgão"
            textAlign="center"
            width="100%"
            pb={0}
          >
            {title} ({formatAgency(id.toLocaleUpperCase('pt'))})
          </Typography>
        </MoreInfoAccordion>
        {agency && agency.coletando && !data ? (
          <></>
        ) : (
          <>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <IconButton
                  aria-label="voltar"
                  color="info"
                  onClick={() => setYear(year - 1)}
                  disabled={!previousDateIsNavigable}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography component="span" variant="h4">
                  {year}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="voltar"
                  color="info"
                  onClick={() => setYear(year + 1)}
                  disabled={!nextDateIsNavigable}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid>
            </Grid>

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
                  {summaryPackage && (
                    <Button
                      variant="outlined"
                      color="info"
                      endIcon={<CloudDownloadIcon />}
                      onClick={() => {
                        ReactGA.event('file_download', {
                          category: 'download',
                          action: `From: ${window.location.pathname}`,
                        });
                      }}
                      href={url.downloadURL(fileLink)}
                      id="download-button"
                    >
                      <Typography variant="button" mr={1}>
                        BAIXAR
                      </Typography>
                      <Typography variant="button" color="#00bfa6">
                        {formatBytes(summaryPackage.size)}
                      </Typography>
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="info"
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(
                        `/pesquisar?anos=${year}&orgaos=${agency.id_orgao}`,
                      );
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
                  {summaryPackage && (
                    <Button
                      variant="outlined"
                      color="info"
                      endIcon={<CloudDownloadIcon />}
                      onClick={() => {
                        ReactGA.event('file_download', {
                          category: 'download',
                          action: `From: ${window.location.pathname}`,
                        });
                      }}
                      href={url.downloadURL(fileLink)}
                      id="download-button"
                    >
                      <Typography variant="button" mr={1}>
                        BAIXAR
                      </Typography>
                      <Typography variant="button" color="#00bfa6">
                        {formatBytes(summaryPackage.size)}
                      </Typography>
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="info"
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(
                        `/pesquisar?anos=${year}&orgaos=${agency.id_orgao}`,
                      );
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
          <RemunerationBarGraph
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
            selectedMonth={navigableMonth}
          />
        </Box>
        {devMode && (
          <Box mt={2}>
            <SearchAccordion selectedAgencies={[agency]} selectedYears={year} />
          </Box>
        )}
        <Box mt={2} mb={12}>
          {plotData.length > 0 && (
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
                    height={350}
                    mobileHeight={555}
                    monthly
                    isAgency
                  />
                </Suspense>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </ThemeProvider>

      <ShareModal
        isOpen={modalIsOpen}
        url={`https://dadosjusbr.org/orgao/${id}/${year}`}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </Container>
  );
};

export default AgencyPageWithNavigation;
