import React, { useMemo, useState } from 'react';
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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import useMediaQuery from '@mui/material/useMediaQuery';

import ShareModal from './ShareModal';
import RemunerationBarGraph from './RemunerationBarGraph';
import * as url from '../url';
import light from '../styles/theme-light';
import { formatAgency } from '../functions/format';

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
  const matches = useMediaQuery('(max-width:500px)');

  return (
    <Container fixed>
      <Box pb={4}>
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
            <Stack
              spacing={2}
              direction="row"
              {...(matches && { direction: 'column', spacing: 1 })}
              justifyContent="flex-end"
              mt={4}
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
                    ReactGA.pageview(
                      url.downloadURL(summaryPackage.Package.url),
                    );
                  }}
                  href={url.downloadURL(summaryPackage.Package.url)}
                  id="download-button"
                >
                  BAIXAR DADOS
                </Button>
              )}
              <Button
                variant="outlined"
                color="info"
                endIcon={<ArrowForwardIosIcon />}
                href={`/orgao/${id}/${year}/${selectedMonth}`}
              >
                EXPLORAR POR MÊS
              </Button>
            </Stack>
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
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
          />
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
