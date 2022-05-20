import Head from 'next/head';
import styled from 'styled-components';
import { Container, Box, Grid, Typography, Link } from '@mui/material';

import Footer from '../components/Footer';
import Nav from '../components/Header';

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
        <Grid container justifyContent="center" py={8}>
          <Grid item width={692}>
            <Typography variant="h1" textAlign="center" gutterBottom>
              O Índice de transparência
            </Typography>
            <Typography variant="body1">
              O indicador, criado em parceria pelo Instituto Federal de Alagoas,
              Transparência Brasil e Universidade Federal de Campina Grande,
              avalia a transparência da remuneração do sistema de Justiça em
              duas dimensões: completude das informações e facilidade de coleta
              e análise de dados abertos.
            </Typography>
            <Typography variant="body1">
              Quanto à completude, há seis critérios para avaliar a
              disponibilidade dos dados. São eles:
            </Typography>
            <ul>
              <li>
                <b>Nome e matrícula</b>: nome e número de identificação do
                funcionário;
              </li>
              <li>
                <b>Lotação</b>: local onde o servidor exerce as atribuições e
                responsabilidades do cargo público;
              </li>
              <li>
                <b>Cargo</b>: função que se exerce numa organização;
              </li>
              <li>
                <b>Remuneração básica</b>: para o Ministério Público o valor da
                remuneração básica é composto pela soma do valor da remuneração
                do cargo efetivo e o valor correspondente a outras verbas
                remuneratórias, legais ou judiciais, como adicionais por tempo
                de serviço, por exemplo. Já para o Judiciário esse valor é o
                correspondente ao subsídio mensal, parcela única, à qual é
                vedado o acréscimo de qualquer gratificação, adicional, abono,
                prêmio, verba de representação ou outra espécie remuneratória,
                de qualquer origem;
              </li>
              <li>
                <b>Outras receitas</b>: inclui remuneração eventual ou
                temporária, tais como: função de confiança ou cargo em comissão,
                gratificação natalina, férias constitucionais, abono
                permanência, insalubridade, bem como as indenizações, por
                exemplo: pecúnias ou auxílios como: alimentação, saúde, creche,
                moradia, natalidade;
              </li>
              <li>
                <b>Detalhamento de Despesas</b>: valor correspondente a
                descontos obrigatórios como: contribuição previdenciária,
                imposto de renda e retenção por teto constitucional.
              </li>
            </ul>
            <Typography variant="body1">
              Na dimensão de facilidade do Índice, há cinco critérios para
              avaliar a dificuldade de acessar dados que estão disponíveis de
              forma automatizada. São elas:
            </Typography>
            <ul>
              <li>
                <b>Necessidade de login</b>: a necessidade de fornecimento de
                informações pessoais e autenticação para acesso dos dados;
              </li>
              <li>
                <b>Necessário captcha</b>: verificação se o acesso está sendo
                feito por humanos;
              </li>
              <li>
                <b>Formato de acesso</b>: se é possível acessar os dados
                programaticamente através de URLs que seguem boas práticas; se é
                necessário raspar os dados de forma facilitada (por meio de
                páginas e URLs com boas práticas de estrutura); se é necessário
                raspagem complexa; ou se é necessário simular um usuário usando
                um navegador (pior caso);
              </li>
              <li>
                <b>Manteve consistência no formato</b>: essa métrica captura se
                houve mudanças no formato como os dados foram estruturados e
                disponibilizados com relação ao mês anterior;
              </li>
              <li>
                <b>Formato estritamente tabular</b>: se os dados estão em
                formato que permite importação direta em software de análise ou
                precisam ser processados primeiro (por ex. por estarem em um doc
                ou pdf).
              </li>
            </ul>
            <Typography variant="h3">Metodologia</Typography>
            <Typography variant="body1">
              Inicialmente calcula-se, para cada mês do período avaliado, a
              média simples da pontuação que o órgão alcançou tanto na dimensão
              de completude quanto na de facilidade.
            </Typography>
            <Typography variant="body1">
              Na maioria dos critérios avaliados nas dimensões, o órgão pode
              pontuar 0 ou 1. Nos critérios remuneração básica, outras receitas,
              detalhamento de despesas e formato de acesso, a escla é contínua
              com pontuações entre 0 e 1. Ainda que haja seis critérios na
              dimensão de completude e cinco na de facilidade, cada dimensão tem
              peso idêntico.
            </Typography>
            <Typography variant="body1">
              A{' '}
              <Link
                href="https://pt.wikipedia.org/wiki/Média_harmônica"
                color="inherit"
              >
                média harmônica
              </Link>{' '}
              das pontuações de ambas as dimensões constitui o Índice de
              Transparência. O Índice é representado em uma escala de 0 a 1, em
              que 0 representa o ente menos transparente e 1, o mais
              transparente. A média harmônica pondera as duas dimensões de
              maneira que se uma delas tiver valor próximo a zero, o índice
              também terá valor próximo a zero.
            </Typography>
            <Typography variant="body1">
              Como o período avaliado corresponde a quantidade de meses, o
              Índice de um órgão no período corresponde à média aritmética dos
              índices calculados mês a mês.
            </Typography>
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
