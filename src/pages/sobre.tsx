import Head from 'next/head';
import styled from 'styled-components';
import { Container, Box, Grid, Typography } from '@mui/material';

import Footer from '../components/Footer';
import Nav from '../components/Header';
import {
  Animation1,
  Animation2,
  Animation3,
  Animation4,
} from '../components/index-animations';

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
          spacing={4}
          my={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={6}>
            <Typography variant="h3">
              Você já tentou acessar dados em sites de órgãos públicos?
            </Typography>
            <Typography variant="body1">
              A Lei Federal 12.527/2011, mais conhecida como Lei de Acesso à
              Informação (LAI), impõe a obrigatoriedade da divulgação dos dados
              de gastos públicos.
            </Typography>
            <Typography variant="body1">
              Porém, a LAI não detalha a forma como esses dados devem ser
              disponibilizados, o que resulta em uma falta de padronização e
              organização das informações, prejudicando a transparência pública.
            </Typography>
            <Typography variant="body1">
              Nessas condições, a fiscalização dos gastos públicos torna-se uma
              tarefa complexa.
            </Typography>
          </Grid>
          <Grid item sm={6} py={12}>
            <Animation1 />
          </Grid>
        </Grid>
      </Container>
      <Banner pt={12} pb={8}>
        <Container fixed>
          <Typography variant="h3" textAlign="center">
            O DadosJusBr existe para libertar estes dados e facilitar o controle
            social da remuneração da elite do sistema de Justiça.
          </Typography>
        </Container>
      </Banner>
      <Container fixed>
        <Grid
          container
          spacing={4}
          my={4}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={6}>
            <Typography variant="h3">Como fazemos isso?</Typography>
            <Typography variant="body1">
              Os agentes públicos do sistema de justiça brasileiro recebem
              outras verbas, além de seus salários, para exercerem seus cargos.
              Dentre elas encontramos auxílio moradia, despesas com saúde,
              auxílio transporte, gratificações, diárias, entre outros
              benefícios.
            </Typography>
          </Grid>
          <Grid item sm={6} py={24}>
            <Animation2 />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          my={12}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={6}>
            <Typography variant="body1">
              Inspirados em projetos como o <b>Serenata de amor</b> e{' '}
              <b>Brasil.io</b>, o <b>DadosJusBr</b> surge com o objetivo de
              apresentar de forma detalhada, organizada e unificada os dados de
              gastos com remuneração dos órgãos que constituem o sistema de
              justiça brasileiro, assim facilitando o acesso e promovendo o
              controle social sobre esses gastos do poder judiciário, ministério
              público, defensoria pública e procuradorias.
            </Typography>
          </Grid>
          <Grid item sm={6} py={12}>
            <Animation3 />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          my={12}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item sm={6}>
            <Typography variant="body1">
              O <b>DadosJusBr</b> utiliza a inteligência de dados para a ação
              cidadã, promovendo um acesso mais democrático e fácil aos dados de
              remuneração do sistema de justiça brasileiro. No DadosJusBr
              podemos entender como cada juiz, promotor e desembargador são
              remunerados. Quais auxílios recebem? Quais os valores destes
              auxílios? Quanto além do salário um funcionário recebeu em
              determinado mês? Quanto um órgão gastou em determinado mês? Todas
              essas perguntas podem ser respondidas através do DadosJusBr.
            </Typography>
          </Grid>
          <Grid item sm={6} py={12}>
            <Animation4 />
          </Grid>
        </Grid>
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
