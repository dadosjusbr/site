import Head from 'next/head';
import styled from 'styled-components';
import { Box, Container, Grid, Typography } from '@mui/material';

import Footer from '../../components/Essentials/Footer';
import Nav from '../../components/Essentials/Header';
import NewsClipping from '../../components/Common/NewsClipping';

import newsJSON from '../../../public/news.json';
import ScrollToTopButton from '../../components/Common/ScrollToTopButton';

export async function getStaticProps() {
  return {
    props: {
      news: newsJSON,
    },
  };
}

export default function Clipping({ news }) {
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
        <Typography variant="h1" mt={6} textAlign="center">
          Notícias
        </Typography>
        <Grid container justifyContent="center" mt={2}>
          {NewsClipping({ news }).map(n => (
            <Grid item xs={12} md={7} sm={12} key={n.props.news.url}>
              <Box my={1}>{n}</Box>
            </Grid>
          ))}
        </Grid>
        <ScrollToTopButton />
      </Container>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  background: #3e5363;
`;
