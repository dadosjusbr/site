import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link,
  Grid,
} from '@mui/material';

import Footer from '../components/Essentials/Footer';
import Nav from '../components/Essentials/Header';
import api from '../services/api';
import { formatAgency, orderStringsWithNum } from '../functions/format';
import DownloadDumpDialog from '../components/Common/DownloadDumpDialog';
import { useDownloadDump } from '../hooks/useDownloadDump';
import Video from '../components/Video';

export default function Index({ ais }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [fileLink] = useDownloadDump();

  const collecting = ais
    .filter(ag => ag.coletando === undefined)
    .sort((a, b) => orderStringsWithNum(a.id_orgao, b.id_orgao));
  const notCollecting = ais
    .filter(ag => ag.coletando !== undefined)
    .sort((a, b) => orderStringsWithNum(a.id_orgao, b.id_orgao));

  const getReasons = ag => {
    if (ag.coletando && ag.coletando.length > 0 && ag.coletando[0].descricao) {
      return ag.coletando[0].descricao.map(desc => `${desc}. `);
    }
    return '';
  };

  return (
    <Page>
      <Head>
        <title>DadosJusBr</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta property="og:title" content="DadosJusBr" />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
        />
      </Head>
      <Nav />
      <Container fixed>
        <Box py={4}>
          <Box pb={4}>
            <Typography variant="h1" textAlign="center" gutterBottom>
              Status das coletas de dados
            </Typography>
            <Grid
              container
              justifyContent="space-evenly"
              alignItems={{ xs: 'normal', md: 'center' }}
              flexDirection={{ xs: 'column-reverse', md: 'row' }}
            >
              <Grid item xs={12} md={3.5} my={{ xs: 4, md: 0 }}>
                <Video.Player
                  src="https://www.youtube-nocookie.com/embed/dXC9nYYNBtY"
                  allowFullScreen
                  loading="lazy"
                  aria-label="Vídeo sobre a página de pesquisa de dados"
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography variant="body1">
                  A API do DadosJusBr é open source e disponível para todos, ela
                  permite que você acesse os dados de remuneração do sistema de
                  justiça brasileiro de maneira fácil e bem documentada. Isso
                  abre um mundo de possibilidades para análises, visualizações e
                  aplicações. Convidamos todos a explorar e contribuir para a
                  nossa comunidade de código aberto. Para mais informações,
                  visite a{' '}
                  <Link
                    underline="always"
                    href="https://api.dadosjusbr.org"
                    target="_blank"
                    rel="noopener"
                  >
                    documentação da API
                  </Link>{' '}
                  ou o{' '}
                  <Link
                    underline="always"
                    href="https://github.com/dadosjusbr/api"
                    target="_blank"
                    rel="noopener"
                  >
                    repositório da API
                  </Link>{' '}
                  no Github.
                  <br />
                  <br />
                  Qualquer problema encontrado na coleta ou integridade dos
                  dados pode ser informado através de uma issue no{' '}
                  <Link
                    underline="always"
                    href="https://github.com/dadosjusbr/site/issues/new"
                    target="_blank"
                    rel="noopener"
                  >
                    repositorio do site
                  </Link>{' '}
                  no Github.
                  <br />
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" gutterBottom my={4}>
              Você pode fazer o download de todas as informações de remunerações
              da nossa base de dados por{' '}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="always"
                onClick={() => setOpenDialog(true)}
                target="_blank"
                rel="noopener"
                sx={{ cursor: 'pointer' }}
              >
                este link.
              </Link>
            </Typography>
            <Typography variant="h3" gutterBottom>
              Órgãos monitorados pelo DadosJusBR: {collecting.length}
            </Typography>
            <List dense>
              {collecting.map(ag => (
                <ListItem key={ag.id_orgao}>
                  <ListItemIcon>
                    <Upper>{formatAgency(ag.id_orgao)}</Upper>
                  </ListItemIcon>
                  <ListItemText>{ag.nome}</ListItemText>
                </ListItem>
              ))}
            </List>
            <Typography variant="h3" gutterBottom pt={4}>
              Órgãos NÃO monitorados pelo DadosJusBR: {notCollecting.length}
            </Typography>
            <List dense>
              {notCollecting.map(ag => (
                <ListItem key={ag.id_orgao}>
                  <ListItemIcon>
                    <Upper>{formatAgency(ag.id_orgao)}</Upper>
                  </ListItemIcon>
                  <ListItemText secondary={getReasons(ag)}>
                    {ag.nome}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <DownloadDumpDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fileLink={fileLink}
        />
      </Container>
      <Footer />
    </Page>
  );
}

export async function getStaticProps() {
  try {
    const res = await api.default.get('/orgaos');
    return {
      props: {
        ais: res.data,
      },
      revalidate: 3600,
    };
  } catch (err) {
    throw new Error(`Erro ao buscar a lista de órgãos - ${err}`);
  }
}

const Page = styled.div`
  background: #3e5363;
`;

const Upper = styled.span`
  text-transform: uppercase;
`;
