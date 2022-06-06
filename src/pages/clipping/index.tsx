import Head from 'next/head';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';

import Footer from '../../components/Footer';
import Nav from '../../components/Header';
import NewsClipping from '../../components/NewsClipping';

export async function getStaticProps() {
  const result = await fetch(`${process.env.STATIC_API_BASE_URL}/news`);
  const news = await result.json();

  return {
    props: {
      news,
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
        <Grid container justifyContent="center" my={4} spacing={2}>
          <NewsClipping news={news} />
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  background: #3e5363;
`;
