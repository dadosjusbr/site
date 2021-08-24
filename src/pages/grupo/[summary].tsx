/* eslint-disable no-restricted-syntax */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import DropDownGroupSelector from '../../components/DropDownGroupSelector';
import AgencyWithNavigation from '../../components/AgencyWithNavigation';
// this constant is used to placehold the max value of a chart data
export default function SummaryPage({ dataList, summary }) {
  return (
    <Page>
      <Head>
        <title>Dados/{summary}</title>
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
      <DropDownGroupSelector value={summary} />
      <div>
        {(() => {
          if (dataList.length === 0) {
            return (
              <ActivityIndicatorPlaceholder>
                Ocorreu um erro.
              </ActivityIndicatorPlaceholder>
            );
          }
          return dataList.map(agency => (
            <GraphWithNavigation
              key={agency.Name}
              title={agency.FullName}
              id={agency.Name}
            />
          ));
        })()}
      </div>
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
  const [year, setYear] = useState(new Date().getFullYear());
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
      const { data: agency } = await api.get(`/orgao/totais/${id}/${year}`);
      setData(agency.MonthTotals ? agency.MonthTotals : []);
      // sets the navigable month in the application state to the last navigable month for the given year
      setNavigableMonth(
        agency.MonthTotals
          ? agency.MonthTotals[agency.MonthTotals.length - 1].Month
          : 1,
      );
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
      summaryPackage={summaryPackage}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { summary } = context.params;
  try {
    const { data } = await api.get(`/orgao/${summary}`);
    if (!data.Agency) {
      context.res.writeHead(301, {
        Location: `/404`,
      });
      context.res.end();
      return { props: {} };
    }
    return {
      props: {
        dataList: data.Agency,
        summary: data.Name,
      },
    };
  } catch (error) {
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
const ActivityIndicatorPlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 0;
  span {
    margin-top: 3rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
  font-size: 3rem;
  align-items: center;
`;
