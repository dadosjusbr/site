import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Box, CircularProgress } from '@mui/material';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { getCurrentYear } from '../../../functions/currentYear';

const AgencyWithoutNavigation = dynamic(
  () => import('../../../components/AgencyWithoutNavigation'),
  { loading: () => <CircularProgress />, ssr: false },
);

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
    <Box>
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
      <Box display="flex" my={8} justifyContent="center">
        <AgencyWithoutNavigation
          data={data}
          id={id}
          year={year}
          agency={agency}
          dataLoading={false}
          title={fullName}
        />
      </Box>
      <Footer />
    </Box>
  );
}

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
