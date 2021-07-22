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
          <div>
            QTD ORGÃOS: {agencyAmount}
            <br />
            QTD MESES: {monthAmount}
          </div>
          <div>
            Os dados vão de {formatedStartDate} a {formatedEndDate}, e incluem{' '}
            {recordAmount} registros de pagamentos de salários, indenizações,
            gratificações e diárias, somando R$ {finalValue / 1000000} milhões
            de reais
          </div>
        </section>
        <DropDownWrapper>
          <h2>Dados Por Grupo</h2>
          <GreenDropDownSelector />
        </DropDownWrapper>
      </Container>
      <GraphWrapper>
        <section>
          <h2>Grafico Geral de remunerações</h2>
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
        completeChartData: [],
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
  margin: 2rem 6rem;
  font-family: 'Roboto Condensed', sans-serif;
  h2,
  h3 {
    text-align: center;
  }
  h2 {
    margin-bottom: 4rem;
  }
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px;
  }
  section {
    * {
      font-size: 2rem;
    }
    padding-top: 6rem;
    padding-bottom: 6rem;
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
  justify-content: space-between;
  color: #fff;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px 20px;
  }
  section {
    max-width: 45%;
    font-size: 1rem;
    * {
      font-size: 2rem;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
    }
    display: flex;
    font-family: 'Roboto Condensed', sans-serif;
  }
  @media (max-width: 600px) {
    section {
      max-width: 100%;
      padding-top: 4rem;
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
  padding: 3rem 2rem;
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
