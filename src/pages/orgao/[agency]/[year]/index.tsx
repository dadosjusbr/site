import styled from 'styled-components';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Header from '../../../../components/Essentials/Header';
import Footer from '../../../../components/Essentials/Footer';
import api from '../../../../services/api';
import AgencyWithNavigation from '../../../../components/RemunerationBarGraph';
import { normalizeMonthlyPlotData } from '../../../../functions/normalize';

export default function AgencyPage({
  id,
  year,
  agency,
  data,
  navigableMonth,
  fullName,
  summaryPackage,
  plotData,
}: {
  id: string;
  year: number;
  agency: Agency;
  data: v2MonthTotals[];
  navigableMonth: number;
  fullName: string;
  summaryPackage: Backup;
  plotData: AggregateIndexes[];
}) {
  const router = useRouter();
  function navigateToGivenYear(y: number) {
    router.push(`/orgao/${id}/${y}`);
  }
  const pageTitle = `${id.toUpperCase()} - ${year}`;
  return (
    <Page>
      <Head>
        <title>{pageTitle}</title>
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
        <AgencyWithNavigation
          data={data}
          id={id}
          year={year}
          agency={agency}
          dataLoading={false}
          title={fullName}
          navigableMonth={navigableMonth}
          setYear={navigateToGivenYear}
          summaryPackage={summaryPackage && summaryPackage}
          plotData={normalizeMonthlyPlotData(plotData)}
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
  const { agency: id, year } = context.params;
  try {
    const { data: agency } = await api.ui.get(`/v2/orgao/totais/${id}/${year}`);
    const { data: plotData } = await api.default.get(
      `/indice/orgao/${id}/${year}`,
    );

    return {
      props: {
        id,
        data: agency?.meses,
        year: parseInt(year as string, 10),
        agency: agency?.orgao,
        nextDateIsNavigable:
          parseInt(year as string, 10) !== new Date().getFullYear(),
        previousDateIsNavigable: parseInt(year as string, 10) !== 2018,
        navigableMonth: agency?.meses
          ? agency?.meses[agency?.meses.length - 1].mes
          : 1,
        fullName: agency?.orgao?.nome,
        summaryPackage: agency?.package || null,
        plotData,
      },
    };
  } catch (err) {
    const { data: agency } = await api.ui.get(`/v2/orgao/totais/${id}/${year}`);
    return {
      props: {
        id,
        year: parseInt(year as string, 10),
        fullName: agency?.orgao?.nome || '',
        data: [],
      },
    };
  }
};
const Container = styled.div`
  margin-top: 3rem;
`;
