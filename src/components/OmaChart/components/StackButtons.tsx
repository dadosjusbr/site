import { Dispatch, SetStateAction } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactGA from 'react-ga4';
import { NextRouter } from 'next/router';
import { formatBytes } from '../../../functions/format';
import * as url from '../../../url';

export default function index({
  router,
  setModalIsOpen,
  fileLink,
  mi,
}: {
  router: NextRouter;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  fileLink: string;
  mi: SummaryzedMI;
}) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        mt={2}
        mb={4}
      >
        <Button
          variant="outlined"
          color="info"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            router.back();
          }}
        >
          VOLTAR
        </Button>
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-end"
        mt={2}
        mb={4}
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
            {formatBytes(mi?.pacote_de_dados?.size)}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}
