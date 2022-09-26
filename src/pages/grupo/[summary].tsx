import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Box, CircularProgress, Container, Grid } from '@mui/material';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import DropDownGroupSelector from '../../components/DropDownGroupSelector';
import AgencyWithNavigation from '../../components/AgencyWithNavigation';
// this constant is used to placehold the max value of a chart data
export default function SummaryPage({ dataList, summary }) {
  const pageTitle = `Dados/${summary}`;
  return (
    <Page>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados do estado: ${summary}`}
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header />
      <Container>
        <Grid container display="flex" flexDirection="column" py={4} my={4}>
          <Grid item pb={4}>
            Selecione os órgãos que você deseja explorar.
          </Grid>
          <Grid item pb={4} sx={{ width: 250 }}>
            <DropDownGroupSelector value={summary} />
          </Grid>
        </Grid>
        <div>
          {(() => {
            if (typeof dataList !== 'undefined' && dataList.length > 0) {
              return dataList.map(agency => (
                <GraphWithNavigation
                  key={agency.Name}
                  title={agency.FullName}
                  id={agency.Name}
                />
              ));
            }
            return (
              <Box
                m={4}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div>
                  <CircularProgress color="info" />
                </div>
                <p>Aguarde...</p>
              </Box>
            );
          })()}
        </div>
      </Container>
      <Footer />
    </Page>
  );
}
// this component is used to to build the main section, with charts and pagination.
// his load some agency so, it needs params to load it.
// the id is the main identifier.
// the title is the vocative from the componenet.

const GraphWithNavigation: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  // this state is used to store the api fetched data after fetch it
  const [data, setData] = useState<any[]>([]);
  const [summaryPackage, setSummaryPackage] = useState<any>();
  // this state is used to check if the actual date is at least 17 days away from January 1st. The data collect always happen in the 17th day, so we set the default year after this first data collect of the year.
  const [year, setYear] = useState(new Date().getDate() <= 17 && new Date().getMonth() + 1 == 1 ? new Date().getFullYear() - 1 : new Date().getFullYear());
  const [agencyData, setAgencyData] = useState<any>();
  const [dataLoading, setDataLoading] = useState(true);
  // the useMemo hook is used to create an memoization (https://en.wikipedia.org/wiki/Memoization) with a state, it's used to avoid the need to recalculate values in screen rederization, here it's used to check if the date is valid to active the nextDate and the previousDate button using dates between 2018-2021 (https://pt-br.reactjs.org/docs/hooks-reference.html#usememo)
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  const [navigableMonth, setNavigableMonth] = useState<any>();
  // this state is used to determine the last month navigable in the given year, to allows to use th "see months" button to navigate to it
  useEffect(() => {
    setDataLoading(true);
    fetchAgencyData();
  }, [year]);
  async function fetchAgencyData() {
    try {
      const { data: agency } = await api.ui.get(
        `/v1/orgao/totais/${id}/${year}`,
      );
      setData(agency.MonthTotals ? agency.MonthTotals : []);
      // sets the navigable month in the application state to the last navigable month for the given year
      setNavigableMonth(
        agency.MonthTotals
          ? agency.MonthTotals[agency.MonthTotals.length - 1].Month
          : 1,
      );
      setAgencyData(agency.Agency);
      setSummaryPackage(agency.SummaryPackage);
      setDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AgencyWithNavigation
      data={data}
      dataLoading={dataLoading}
      id={id}
      navigableMonth={navigableMonth}
      nextDateIsNavigable={nextDateIsNavigable}
      previousDateIsNavigable={previousDateIsNavigable}
      setYear={setYear}
      title={title}
      year={year}
      agency={agencyData}
      summaryPackage={summaryPackage && summaryPackage}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { summary } = context.params;
  try {
    const { data } = await api.ui.get(`/v1/orgao/${summary}`);
    if (!data.Agency) {
      // context.res.writeHead(301, {
      //   Location: `/404`,
      // });
      // context.res.end();
      return { props: {} };
    }
    return {
      props: {
        dataList: data.Agency,
        summary: data.Name,
      },
    };
  } catch (error) {
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
