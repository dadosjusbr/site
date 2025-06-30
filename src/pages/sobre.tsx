import Head from 'next/head';
import styled from 'styled-components';
import { Container, Box, Grid, Typography } from '@mui/material';

import Footer from '../components/Essentials/Footer';
import Nav from '../components/Essentials/Header';
import Team from '../components/Common/Team';

export default function Index() {
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
        <Grid
          container
          spacing={1}
          my={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={12}>
            <Typography variant="h3">
              Fortalecemos o accountability do sistema de Justiça
            </Typography>
            <Typography variant="body1">
              O DadosJusBr é um projeto da Transparência Brasil que coleta,
              padroniza, divulga e analisa contracheques do Judiciário e do
              Ministério Público.
              <br />
              Fortalecemos o controle social sobre os salários recebidos por
              magistrados, promotores e procuradores, e atuamos para coibir
              irregularidades e ampliar a transparência.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Banner pt={12} pb={8}>
        <Container fixed>
          <Typography variant="h3">
            Os contracheques do sistema de Justiça não têm formato padronizado,
            estão dispersos em diferentes portais e muitas vezes com restrição
            de obtenção. O DadosJusBr utiliza tecnologia para superar esses
            obstáculos e promover o fácil acesso a esses pagamentos.
          </Typography>
        </Container>
      </Banner>
      <Container fixed>
        <Grid
          container
          spacing={1}
          mt={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={12}>
            <Typography variant="h3">Como fazemos isso?</Typography>
            <Typography variant="body1">
              Desenvolvemos robôs, que obtêm mensalmente os contracheques do
              Judiciário (a partir do painel de remuneração do Conselho Nacional
              de Justiça) e do Ministério Público (no portal de transparência de
              cada órgão). Alguns MPs estaduais não permitem a atuação
              automatizada, e são submetidos à coleta manual periódica.
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="body1">
              O <b>DadosJusBr</b> utiliza inteligência de dados para a atuação
              cidadã, se espelhando em projetos como Serenata de Amor e
              Brasil.io. Todos os contracheques passam por processos de
              padronização e verificação de integridade. Depois, são inseridos
              nas nossas bases de dados, e podem ser analisados por qualquer
              usuário por meio dos gráficos do portal, acesso à API ou download
              de arquivos.
            </Typography>
          </Grid>

          <Grid item sm={12}>
            <Typography variant="body1">
              Nossa equipe produz estudos sobre o comportamento dos diversos
              benefícios pagos nos contracheques dos membros do sistema de
              Justiça, que resultam em ampla divulgação midiática e incidência
              junto a atores e instituições estratégicas.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          my={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={12}>
            <Typography variant="h3">Nossa história</Typography>
            <Typography variant="body1">
              A semente do DadosJusBr é plantada em 2018, quando a equipe “Lupa
              na Toga” participou de um hackfest do Conselho Nacional do
              Ministério Público (CNMP), desenvolvendo com um projeto de
              obtenção automatizada de dados de remuneração do Judiciário. O
              professor universitário da IFAL (Instituto Federal de Alagoas)
              Daniel Fireman, integrante da equipe, continuou aprimorando o
              projeto, que resultou em um TCC de um aluno. Depois, o Ministério
              Público da Paraíba viabilizou o custeio de dois estagiários,
              estudantes da UFCG (Universidade Federal de Campina Grande), para
              ampliarem o potencial de coleta, que teve um reforço de um grant
              da Open Knowledge. Em 2021, a Transparência Brasil assume a
              coordenação do projeto, inicialmente, em parceria com a IFAL e a
              UFCG, depois apenas com equipe própria. Nesse período, recebeu
              quatro anos de financiamento do Instituto Betty & Jacob Lafer e
              firmou duas parcerias com o Instituto República.org.
            </Typography>
          </Grid>
        </Grid>
        <Team />
      </Container>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  background: #3e5363;
`;

const Banner = styled(Box)({
  backgroundImage: 'url("img/bg.svg")',
  backgroundColor: 'rgba(127, 61, 139, 90%)',
});
