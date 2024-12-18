import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga4';

import {
  Box,
  Button,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import * as url from '../../url';
import ShareModal from '../Common/ShareModal';
import light from '../../styles/theme-light';
import Drawer from '../Common/Drawer';
import { formatBytes } from '../../functions/format';
import StackButtons from './components/StackButtons';
import AgencyGenerals from './components/AgencyGenerals';
import TransparencyMetrics from './components/TransparencyMetrics';
import MembersGraph from './components/MembersGraph';
import CollectInfos from './components/CollectInfos';
import SearchAccordion from './components/OMASearchAccordion';
import MONTHS, { months } from '../../@types/MONTHS';
import AlertModal from '../Common/AlertModal';

export interface OMASummaryProps {
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
  maxRemuneration: number;
  totalRemuneration: number;
  discounts: number;
  maxDiscounts: number;
  chartData: AgencyRemuneration;
  mi: SummaryzedMI;
  year: number;
  month: number;
  agency: string;
  selectedAgencies: Agency[];
}

const OMASummary: React.FC<OMASummaryProps> = ({
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  maxRemuneration,
  totalRemuneration,
  discounts,
  maxDiscounts,
  chartData,
  mi,
  year,
  month,
  agency,
  selectedAgencies,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileLink = `${process.env.S3_REPO_URL}/${agency}/datapackage/${agency}-${year}-${month}.zip`;
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  const handleOpen = () =>
    router.push(
      `mailto:contato@dadosjusbr.org?subject=Inconsistências nos contracheques de ${MONTHS[month]}/${year}`,
    );
  console.log(mi);
  return (
    <>
      {!matches ? (
        <StackButtons
          router={router}
          setModalIsOpen={setModalIsOpen}
          fileLink={fileLink}
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
          </Stack>
        </Drawer>
      )}
      <ThemeProvider theme={light}>
        {mi?.inconsistente && (
          <Box mb={2} display="flex" justifyContent="center">
            <AlertModal
              agencyData={{
                nome: selectedAgencies?.at(0).nome,
                ouvidoria: selectedAgencies?.at(0).ouvidoria,
              }}
              handleClose={null}
              handleOpen={handleOpen}
              openParam={null}
              openOmbudsman={false}
            >
              O DadosJusBr encontrou inconsistências nos contracheques de{' '}
              {MONTHS[month]}/{year} no arquivo originalmente disponibilizado
              por este órgão, como erros no preenchimento dos campos de
              informação. Entre em contato para saber mais:
              contato@dadosjusbr.org.
            </AlertModal>
          </Box>
        )}

        <Grid container spacing={2}>
          <AgencyGenerals
            maxPerk={maxPerk}
            maxWage={maxWage}
            maxRemuneration={maxRemuneration}
            totalPerks={totalPerks}
            totalWage={totalWage}
            totalRemuneration={totalRemuneration}
            discounts={discounts}
            maxDiscounts={maxDiscounts}
            totalMembers={totalMembers}
          />
          <MembersGraph chartData={chartData} />
          <TransparencyMetrics mi={mi} month={month} year={year} />
          <SearchAccordion
            selectedYears={year}
            selectedMonths={[months[month - 1]]}
            selectedAgencies={selectedAgencies}
          />
          <CollectInfos mi={mi} agency={agency} />
        </Grid>

        {!matches ? (
          <StackButtons
            router={router}
            setModalIsOpen={setModalIsOpen}
            fileLink={fileLink}
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
        agencyName={selectedAgencies?.at(0).nome}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default OMASummary;
