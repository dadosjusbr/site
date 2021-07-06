import styled from 'styled-components';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import api from '../../../../services/api';

export default function AgencyPage() {
  return (
    <Page>
      <Head>
        {/* <title>
          [{agency.toUpperCase()}] Folha de Pagameto {month}/{year}
        </title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados do mês ${month} no ano ${year} na agência ${fullName}`}
        /> */}
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header theme="LIGHT" />
      <Footer />
    </Page>
  );
}
const Page = styled.div`
  background: #fff;
`;
export const getServerSideProps: GetServerSideProps = async context => {
  const { agency: id, year, month } = context.params;
  try {
    const { data: agency } = await api.get(`/orgao/totais/${id}/${year}`);

    return {
      props: {},
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};
