import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Box, CircularProgress } from '@mui/material';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import { getCurrentYear } from '../../../functions/currentYear';
import { normalizePlotData } from '../../../functions/normalize';

const AgencyWithoutNavigation = dynamic(
  () => import('../../../components/AgencyWithoutNavigation'),
  { loading: () => <CircularProgress />, ssr: false },
);

export default function AnualAgencyPage({
  id,
  agency,
  data,
  fullName,
  plotData,
}: {
  id: string;
  agency: Agency;
  data: AnnualSummaryData[];
  fullName: string;
  plotData: AggregateIndexes[];
}) {
  const [year, setYear] = useState(getCurrentYear());
  const [agencyTotals, setAgencyTotals] = useState<v2AgencyTotalsYear>();
  useEffect(() => {
    const yearData: number =
      data &&
      data
        .map(d => d.ano)
        .sort((a, b) => b - a)
        .find(d => d <= getCurrentYear());

    fetchAgencyTotalData();
    setYear(yearData);
  }, [data]);

  const fetchAgencyTotalData = async () => {
    const currentYear = getCurrentYear();
    await fetchAgencyTotalDataRecursive(currentYear);
  };

  const fetchAgencyTotalDataRecursive = async (yearParam: number) => {
    try {
      const { data: agencyTotalsResponse } = await api.ui.get(
        `/v2/orgao/totais/${id}/${year}`,
      );

      if (agencyTotalsResponse.meses) {
        setAgencyTotals(agencyTotalsResponse);
      } else {
        const previousYear = yearParam - 1;
        await fetchAgencyTotalDataRecursive(previousYear);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
      <Box display="flex" my={10} justifyContent="center">
        <AgencyWithoutNavigation
          data={data}
          agencyTotals={agencyTotals}
          id={id}
          year={year}
          agency={agency}
          dataLoading={false}
          title={fullName}
          plotData={normalizePlotData(plotData)}
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
    const { data: plotData } = await api.default.get(`/indice/orgao/${id}`);

    return {
      props: {
        id,
        data: agency.dados_anuais ? agency.dados_anuais : null,
        agency: agency.orgao,
        fullName: agency.orgao.nome,
        plotData,
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
