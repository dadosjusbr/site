import Head from 'next/head';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Footer from '../../components/Footer';
import Nav from '../../components/Header';

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
          {news.map((n, i) => (
            <Grid id={`clip-${i}`} item sx={{ width: 692 }}>
              <Card id={`clipcard-${i}`}>
                <CardContent>
                  <Typography color="text.secondary">{n.date}</Typography>
                  <Typography variant="h5">{n.title}</Typography>
                  <Typography color="text.secondary">{n.site}</Typography>
                  <Box textAlign="right">
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      endIcon={<OpenInNewIcon />}
                      href={n.url}
                      target="_blank"
                    >
                      Leia
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  background: #3e5363;
`;
