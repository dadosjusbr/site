import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';

import { Button, Grid, Stack, ThemeProvider, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import * as url from '../../url';
import ShareModal from '../ShareModal';
import light from '../../styles/theme-light';
import Drawer from '../Drawer';
import { formatBytes } from '../../functions/format';
import StackButtons from './components/StackButtons';
import AgencyGenerals from './components/AgencyGenerals';
import TransparencyMetrics from './components/TransparencyMetrics';
import MembersGraph from './components/MembersGraph';
import CollectInfos from './components/CollectInfos';

export interface OMASummaryProps {
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
  chartData: AgencySalary;
  mi: SummaryzedMI;
  year: number;
  month: number;
  agency: string;
}

const OMASummary: React.FC<OMASummaryProps> = ({
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  chartData,
  mi,
  year,
  month,
  agency,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileLink = `${process.env.S3_REPO_URL}/${agency}/datapackage/${agency}-${year}-${month}.zip`;
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  return (
    <>
      {!matches ? (
        <StackButtons
          router={router}
          setModalIsOpen={setModalIsOpen}
          agency={agency}
          fileLink={fileLink}
          month={month}
          year={year}
          mi={mi}
        />
      ) : (
        <Drawer>
          <Stack spacing={2} direction="column" mt={3} mx={6}>
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
              endIcon={<CloudDownloadIcon />}
              onClick={() => {
                ReactGA.event('file_download', {
                  category: 'download',
                  action: `From: ${window.location.pathname}`,
                });
              }}
              href={url.downloadURL(fileLink)}
            >
              <Typography variant="button" mr={1}>
                BAIXAR
              </Typography>
              <Typography variant="button" color="#00bfa6">
                {formatBytes(mi.pacote_de_dados.size)}
              </Typography>
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<SearchIcon />}
              onClick={() => {
                router.push(
                  `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
                );
              }}
            >
              PESQUISAR
            </Button>
          </Stack>
        </Drawer>
      )}
      <ThemeProvider theme={light}>
        <Grid container spacing={2}>
          <AgencyGenerals
            maxPerk={maxPerk}
            maxWage={maxWage}
            totalPerks={totalPerks}
            totalWage={totalWage}
            totalMembers={totalMembers}
          />
          <TransparencyMetrics mi={mi} month={month} year={year} />
          <MembersGraph chartData={chartData} />
          <CollectInfos mi={mi} agency={agency} />
        </Grid>

        {!matches ? (
          <StackButtons
            router={router}
            setModalIsOpen={setModalIsOpen}
            agency={agency}
            fileLink={fileLink}
            month={month}
            year={year}
            mi={mi}
          />
        ) : (
          <Stack spacing={2} direction="column" my={2} mx={6}>
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
              endIcon={<CloudDownloadIcon />}
              onClick={() => {
                ReactGA.event('file_download', {
                  category: 'download',
                  action: `From: ${window.location.pathname}`,
                });
              }}
              href={url.downloadURL(fileLink)}
            >
              <Typography variant="button" mr={1}>
                BAIXAR
              </Typography>
              <Typography variant="button" color="#00bfa6">
                {formatBytes(mi.pacote_de_dados.size)}
              </Typography>
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<SearchIcon />}
              onClick={() => {
                router.push(
                  `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
                );
              }}
            >
              PESQUISAR
            </Button>
          </Stack>
        )}
      </ThemeProvider>
      <ShareModal
        url={`https://dadosjusbr.org/orgao/${agency}/${year}/${month}`}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default OMASummary;
