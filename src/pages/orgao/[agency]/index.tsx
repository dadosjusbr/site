import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import AgencyWithoutNavigation from '../../../components/AgencyWithoutNavigation';
import { getCurrentYear } from '../../../functions/currentYear';

export default function AnualAgencyPage({ id, agency, data, fullName }) {
  const [year, setYear] = useState(getCurrentYear());
  useEffect(() => {
    const yearData: number =
      data &&
      data
        .map(d => d.ano)
        .sort((a, b) => b - a)
        .find(d => d <= getCurrentYear());

    setYear(yearData);
  }, [data]);
  return (
    <Page>
      <Head>
        <title>{fullName}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados do orgão: ${fullName}`}
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header />
      <Container>
        <AgencyWithoutNavigation
          data={data}
          id={id}
          year={year}
          agency={agency}
          dataLoading={false}
          title={fullName}
        />
      </Container>
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background: #3e5363;
`;
export const getServerSideProps: GetServerSideProps = async context => {
  const { agency: id } = context.params;
  try {
    const { data: agency } = await api.ui.get(`/v2/orgao/resumo/${id}`);
    return {
      props: {
        id,
        data: agency.dados_anuais ? agency.dados_anuais : null,
        agency: agency.orgao,
        fullName: agency.orgao.nome,
      },
    };
  } catch (err) {
    context.res.writeHead(301, {
      Location: `/404`,
    });
    context.res.end();
    return {
      props: {},
    };
  }
};
const Container = styled.div`
  margin-top: 3rem;
`;
