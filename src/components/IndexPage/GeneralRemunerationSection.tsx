import dynamic from 'next/dynamic';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const RemunerationBarGraph = dynamic(
  () => import('../RemunerationBarGraph/components/RemunerationChart'),
  { loading: () => <CircularProgress /> },
);

type GeneralRemunerationSectionProps = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  completeChartData: any[];
  year: number;
  setYear: (year: number) => void;
  loading: boolean;
  previousDateIsNavigable: boolean;
  nextDateIsNavigable: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  setOpenDialog: (isOpen: boolean) => void;
  dumpDate: string;
};

export default function GeneralRemunerationSection({
  completeChartData,
  year,
  loading,
  previousDateIsNavigable,
  nextDateIsNavigable,
  dumpDate,
  setYear,
  setModalIsOpen,
  setOpenDialog,
}: GeneralRemunerationSectionProps) {
  return (
    <Box my={12} id="general-remuneration-section">
      <Typography variant="h2" textAlign="center">
        Total das remunerações dos membros dos Tribunais de Justiça e
        Ministérios Públicos
      </Typography>
      <Box textAlign="center">
        <IconButton
          aria-label="voltar"
          color="info"
          onClick={() => setYear(year - 1)}
          disabled={!previousDateIsNavigable}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography component="span" variant="h6">
          {year}
        </Typography>
        <IconButton
          aria-label="voltar"
          color="info"
          onClick={() => setYear(year + 1)}
          disabled={!nextDateIsNavigable}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box my={4}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
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
        </Stack>
        <Box id="remuneration-graph">
          <RemunerationBarGraph
            year={year}
            agency={null}
            data={completeChartData}
            dataLoading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
}
