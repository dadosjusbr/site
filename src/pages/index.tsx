import Head from 'next/head';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Header';
import DropDownGroupSelector from '../components/DropDownGroupSelector';
import RemunerationBarGraph from '../components/RemunerationBarGraph';

export default function Index({
  agencyAmount,
  monthAmount,
  startDate,
  endDate,
  recordAmount,
  finalValue,
  completeChartData,
}) {
  const formatedStartDate = useMemo<string>(() => {
    const d = new Date(JSON.parse(startDate));
    return `${d.getMonth()}/${d.getFullYear()}`;
  }, [startDate]);
  const formatedEndDate = useMemo<string>(() => {
    const d = new Date(JSON.parse(endDate));
    return `${d.getMonth()}/${d.getFullYear()}`;
  }, [endDate]);
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
        <section>
          <h2>O DadosJus liberta os dados!</h2>
          <br />
          <GeneralInfoList>
            <li>
              <img src="/img/anim-group-2/icon_salario.svg" alt="salário" />
              <span>Orgãos libertados: {agencyAmount}</span>
            </li>
            <li>
              <img
                src="/img/anim-group-2/icon_beneficio.svg"
                alt="beneficios"
              />
              <span>Meses libertados: {monthAmount}</span>
            </li>
          </GeneralInfoList>
        </section>
        <DropDownWrapper>
          <h3>Dados Por Grupo</h3>
          <GreenDropDownSelector />
        </DropDownWrapper>
      </Container>
      <Container className="released-data">
        <section>
          Os dados vão de {formatedStartDate} a {formatedEndDate}, e incluem{' '}
          {recordAmount} registros de pagamentos de salários, indenizações,
          gratificações e diárias, somando R$ {finalValue / 1000000} milhões de
          reais
        </section>
      </Container>
      <GraphWrapper>
        <section>
          <h2>
            Grafico Geral de remunerações do ano {new Date().getFullYear()}
          </h2>
          <RemunerationBarGraph
            year={new Date().getFullYear()}
            data={completeChartData}
            dataLoading={false}
          />
        </section>
      </GraphWrapper>
      <Footer />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  try {
    return {
      props: {
        agencyAmount: 1000,
        monthAmount: 1000,
        startDate: JSON.stringify(new Date()),
        endDate: JSON.stringify(new Date()),
        recordAmount: `${9984372}`,
        finalValue: `${58000000}`,
        completeChartData: [
          {
            Month: 1,
            Wage: 18776344.089999877,
            Perks: 1235640.4699999972,
            Others: 42348121.77999976,
          },
          {
            Month: 2,
            Wage: 18749246.019999877,
            Perks: 1422332.8599999961,
            Others: 23539751.029999867,
          },
        ],
      },
    };
  } catch (err) {
    context.res.writeHead(301, {
      Location: `/404`,
    });
    context.res.end();
    return { props: {} };
  }
};
const Page = styled.div`
  background: #3e5363;
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
const Container = styled.div`
  display: flex;
  margin: 0px 68px;
  color: #fff;
  padding-top: 8rem;
  h2,
  h3 {
    font-size: 3rem !important;
  }
  padding-bottom: 4rem;
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px 20px;
  }
  section {
    font-size: 1rem;
    * {
      font-size: 2rem;
    }
    flex-direction: column;
    font-size: 2rem;
    justify-content: space-between;
    width: 100%;
    margin: 0px 1rem;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    display: flex;
    font-family: 'Roboto Condensed', sans-serif;
  }
  @media (max-width: 600px) {
    section {
      max-width: 100%;
      padding-top: 4rem;
      margin: 0;
      padding-bottom: 4rem;
    }
    flex-direction: column;
  }
  &.first {
    padding-top: 4rem;
    @media (max-width: 600px) {
      padding-top: 3rem;
      div {
        padding-top: 0rem;
      }
    }
  }
  &.released-data {
    margin: 4rem 0;
    padding: 68px;
    background-color: #7f3d8b;
    background-image: url('/img/splash_background.png');
  }
`;
const DropDownWrapper = styled.section`
  width: 100%;
  flex-direction: column;
  div {
    padding: 0;
    max-width: 100%;
    select {
      width: 100%;
      margin: 0;
    }
  }
`;
const GreenDropDownSelector = styled(DropDownGroupSelector)`
  background-color: #2fbb96;
  border: #3e5363;
  margin-top: 120px;
  padding: 5rem 2rem;
  font-size: 2.5rem !important;
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const GeneralInfoList = styled.ul`
  list-style: none;
  background-color: #f5f6f7;
  padding: 2rem;
  color: #3e5363;
  li {
    & + li {
      margin-top: 1rem;
    }
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      margin-right: 1rem;
      width: 4rem;
      background: #3e5363;
    }
  }
`;
