import { useState } from 'react';
import ReactGA from 'react-ga4';
import styled from 'styled-components';
import { Typography, Grid, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DropDownGroupSelector from '../Common/DropDownGroupSelector';
import Video from '../Video';

type HeadlineSectionProps = {
  collecting: Agency[];
  recordAmount: number;
  finalValue: number;
  formatedStartDate: string;
  formatedEndDate: string;
  setOpenDialog: (isOpen: boolean) => void;
};

export default function HeadlineSection({
  collecting,
  recordAmount,
  finalValue,
  formatedStartDate,
  formatedEndDate,
  setOpenDialog,
}: HeadlineSectionProps) {
  const [videoURL, setVideoURL] = useState('4PB39l4IykI');

  return (
    <>
      <Typography variant="h1" p={0} lineHeight={1} textAlign="center">
        Acesse as remunerações do sistema de Justiça
      </Typography>
      <br />
      <Grid container justifyContent="space-between">
        <Grid item xs={12} md={7.2}>
          <Typography component="p">
            Os dados vão de <Lowercase>{formatedStartDate}</Lowercase> a{' '}
            <Lowercase>{formatedEndDate}</Lowercase> e são provenientes de{' '}
            <Link href="/status">
              <Typography
                variant="inherit"
                component="span"
                color="success.main"
              >
                {collecting.length}
              </Typography>{' '}
              órgãos
            </Link>{' '}
            que compreendem{' '}
            <Typography variant="inherit" component="span" color="success.main">
              {recordAmount}
            </Typography>{' '}
            registros de pagamentos de salários, indenizações, gratificações e
            diárias, totalizando{' '}
            <Typography variant="inherit" component="span" color="success.main">
              {(finalValue / 1000000000).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              bilhões
            </Typography>{' '}
            em recursos públicos.
          </Typography>
          <Grid
            container
            display="flex"
            alignItems="flex-start"
            justifyContent="space-evenly"
            my={4}
          >
            <Grid item>
              <DropDownGroupSelector minWidth={125} />
            </Grid>
            <Grid item borderBottom="2px solid #2fbb96" mt={0.7}>
              <Link
                href="/pesquisar"
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                }}
                onClick={() => {
                  ReactGA.event('file_download', {
                    category: 'download',
                    action: `From: ${window.location.pathname}`,
                  });
                }}
              >
                <Typography ml={1} mr={2}>
                  PESQUISAR
                </Typography>
                <SearchIcon />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} position="relative">
          <Video.Player
            src={`https://www.youtube-nocookie.com/embed/${videoURL}`}
            loading="lazy"
            allowFullScreen
            aria-label="Vídeo sobre o Portal de Remunerações"
          />
          <Video.Related
            buttonProps={{
              sx: { position: 'absolute', left: 0, top: '95%' },
            }}
            setVideoURL={setVideoURL}
            relatedVideos={['TaQN-gLEV0Y', 'zDCiDV-IUR0']}
          />
        </Grid>
      </Grid>
      <Typography component="p" mt={3}>
        Você pode fazer o{' '}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          underline="always"
          onClick={() => setOpenDialog(true)}
          target="_blank"
          rel="noopener"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="inherit" component="span" color="success.main">
            download
          </Typography>
        </Link>{' '}
        de todas as informações de remunerações da nossa base de dados!
      </Typography>
    </>
  );
}

const Lowercase = styled.span`
  text-transform: lowercase;
`;
