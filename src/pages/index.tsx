import { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Container, Grid, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from '../components/Footer';
import Nav from '../components/Header';
import DropDownGroupSelector from '../components/DropDownGroupSelector';
import RemunerationBarGraph from '../components/RemunerationBarGraph';
import api from '../services/api';

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Index({
  agencyAmount,
  monthAmount,
  startDate,
  endDate,
  recordAmount,
  finalValue,
}) {
  const formatedStartDate = useMemo<string>(() => {
    const d = new Date(startDate);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  }, [startDate]);
  const formatedEndDate = useMemo<string>(() => {
    const d = new Date(endDate);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  }, [endDate]);
  const [completeChartData, setCompleteChartData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [loading, setLoading] = useState(true);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  useEffect(() => {
    fetchGeneralChartData();
  }, [year]);
  async function fetchGeneralChartData() {
    try {
      const { data } = await api.ui.get(`/geral/remuneracao/${year}`);
      setCompleteChartData(
        data.map(d => ({
          BaseRemuneration: d.base_remuneration,
          OtherRemunerations: d.other_remunerations,
          // eslint-disable-next-line no-underscore-dangle
          Month: d._id,
        })),
      );
    } catch (error) {
      setCompleteChartData([]);
    }
    setLoading(false);
  }
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
      <Container>
        <Headline>
          O DadosJusBr recupera continuamente dados dos diferentes orgãos do
          sistema de jusiça, os padroniza e publica como dado aberto. Libertamos
          os dados.
          <br />
          Já são {monthAmount} Meses de {agencyAmount} Orgãos libertados!
        </Headline>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>O DadosJus liberta os dados!</h2>
            <ThemeProvider theme={lightTheme}>
              <Paper elevation={3}>
                <Box py={2}>
                  <List>
                    <li>
                      <span>Orgãos libertados: {agencyAmount}</span>
                    </li>
                    <li>
                      <span>Meses libertados: {monthAmount}</span>
                    </li>
                  </List>
                </Box>
              </Paper>
            </ThemeProvider>
          </Grid>
          <Grid item xs={6}>
            <h2>Dados Por Grupo</h2>
            <DropDownGroupSelector />
          </Grid>
        </Grid>
      </Container>
      <Container className="released-data">
        <section>
          Os dados vão de {formatedStartDate} a {formatedEndDate}, e incluem{' '}
          {recordAmount} registros de pagamentos de salários, indenizações,
          gratificações e diárias, somando R${' '}
          {(finalValue / 1000000000).toFixed(2)} bilhões de reais
        </section>
      </Container>
      <GraphWrapper>
        <section>
          <h2>Total das remunerações dos membros de todos os órgãos</h2>
          <MainGraphSectionHeader>
            <div>
              <button
                className="left"
                onClick={() => setYear(year - 1)}
                disabled={!previousDateIsNavigable}
                type="button"
              >
                <img src="/img/arrow.svg" alt="seta esquerda" />
              </button>
              <span>{year}</span>
              <button
                disabled={!nextDateIsNavigable}
                onClick={() => setYear(year + 1)}
                type="button"
              >
                <img src="/img/arrow.svg" alt="seta direita" />
              </button>
            </div>
          </MainGraphSectionHeader>
          <RemunerationBarGraph
            year={year}
            data={completeChartData}
            dataLoading={loading}
            billion
          />
        </section>
      </GraphWrapper>
      <Footer />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const { data } = await api.ui.get('/geral/resumo');
    return {
      props: {
        agencyAmount: data.AgencyAmount,
        monthAmount: data.MonthlyTotalsAmount,
        startDate: data.StartDate,
        endDate: data.EndDate,
        recordAmount: `${data.RemunerationRecordsCount}`,
        finalValue: `${data.GeneralRemunerationValue}`,
      },
    };
  } catch (err) {
    // context.res.writeHead(301, {
    //   Location: `/404`,
    // });
    // context.res.end();
    return { props: {} };
  }
};
const Page = styled.div`
  background: #3e5363;
`;
const Headline = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  font-size: 2rem;
`;
const List = styled.ul`
  list-style: none;
`;
const GraphWrapper = styled.div`
  margin: 2rem 7.8rem;
  font-family: 'Roboto Condensed', sans-serif;
  h2,
  h3 {
    text-align: center;
    font-size: 1.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px;
  }
  section {
    padding-top: 6rem;
    background-color: #fff;
    color: #3e5363;
    width: 100%;
    max-width: 100%;
    justify-content: center;
    flex-direction: column;
  }
`;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  width: 100%;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center;
  h2 {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
  span {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 400;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 35rem;
    button {
      &:disabled,
      &[disabled] {
        border: 2px solid #3e5363;
        img {
          filter: invert(75%) sepia(56%) saturate(285%) hue-rotate(163deg)
            brightness(87%) contrast(84%);
        }
        background-color: #fff;
      }
      &.left {
        transform: rotate(180deg);
      }
      img {
        position: initial;
      }
      width: 30px;
      color: #3e5363;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background-color: #3e5363;
    }
    @media (max-width: 600px) {
      width: 30rem;
    }
    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
`;
const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 20%;
  text-align: center;
  background-color: #fff;
  span {
    margin-top: 3rem;
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
  align-items: center;
`;
