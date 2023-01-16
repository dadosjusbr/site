import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import {
  Container,
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
  ThemeProvider,
  Stack,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import ShareModal from './ShareModal';
import RemunerationBarGraph from './RemunerationBarGraph';
import * as url from '../url';
import light from '../styles/theme-light';
import { formatAgency } from '../functions/format';
import styled from 'styled-components';
import Drawer from './Drawer';
import { GreenColor } from './OmaChart';

export interface AgencyPageWithNavigationProps {
  id: string;
  year: number;
  agency: any;
  title: string;
  nextDateIsNavigable: boolean;
  previousDateIsNavigable: boolean;
  setYear: (y: number) => void;
  data: any[];
  dataLoading: boolean;
  navigableMonth: number;
  summaryPackage?: any;
}

const AgencyPageWithNavigation: React.FC<AgencyPageWithNavigationProps> = ({
  id,
  title,
  year,
  agency,
  setYear,
  data,
  dataLoading,
  navigableMonth,
  summaryPackage,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const m = navigableMonth || 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(m);
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  const fileLink = `${process.env.S3_REPO_URL}/${id}/datapackage/${id}-${year}.zip`;
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <Container fixed>
      <Box>
        <Typography variant="h2" textAlign="center">
          {title} ({formatAgency(id.toLocaleUpperCase('pt'), title)})
        </Typography>
        {agency && agency.collecting ? (
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
              <Div>
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
                        ReactGA.pageview(url.downloadURL(fileLink));
                      }}
                      href={url.downloadURL(fileLink)}
                      id="download-button"
                    >
                      BAIXAR{' '}
                      <GreenColor>
                        {formatBytes(summaryPackage.Package.size)}
                      </GreenColor>
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="info"
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(
                        `/pesquisar?anos=${year}&orgaos=${agency.aid}`,
                      );
                    }}
                  >
                    PESQUISAR
                  </Button>
                </Stack>
              </Div>
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
                        ReactGA.pageview(url.downloadURL(fileLink));
                      }}
                      href={url.downloadURL(fileLink)}
                      id="download-button"
                    >
                      BAIXAR{' '}
                      <GreenColor>
                        {formatBytes(summaryPackage.Package.size)}
                      </GreenColor>
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="info"
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(
                        `/pesquisar?anos=${year}&orgaos=${agency.aid}`,
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
        <Box mb={12}>
          <RemunerationBarGraph
            onMonthChange={month => {
              if (selectedMonth === month) {
                setSelectedMonth(navigableMonth);
              } else {
                setSelectedMonth(month);
              }
            }}
            selectedMonth={selectedMonth}
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
          />
        </Box>
      </ThemeProvider>

      <ShareModal
        pageTitle={title}
        isOpen={modalIsOpen}
        url={`https://dadosjusbr.org/orgao/${id}/${year}`}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </Container>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AgencyPageWithNavigation;
