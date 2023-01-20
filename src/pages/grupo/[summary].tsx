import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import DropDownGroupSelector from '../../components/DropDownGroupSelector';
import AgencyWithNavigation from '../../components/AgencyWithNavigation';
import { getCurrentYear } from '../../functions/currentYear';
// this constant is used to placehold the max value of a chart data
export default function SummaryPage({ dataList, summary }) {
  const pageTitle = `Dados/${summary}`;
  const [value, setValue] = useState('');
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
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          py={4}
          my={4}
        >
          <Grid item pb={4}>
            <Typography>Selecione o grupo</Typography>

            <DropDownGroupSelector value={summary} />
          </Grid>
          <Grid item pb={4}>
            <Typography>
              Selecione o órgãos que você deseja explorar.
            </Typography>

            <FormControl fullWidth sx={{ m: 1, minWidth: 240, maxWidth: 250 }}>
              <Select
                id="orgaos-select"
                labelId="orgaos-select-label"
                defaultValue="Selecione um órgão"
                value={value}
                onChange={e => setValue(e.target.value.toUpperCase())}
                label="Estados"
                displayEmpty
                inputProps={{ 'aria-label': 'Dados por órgão' }}
                input={<OutlinedInput />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>Selecione</em>;
                  }
                  return selected;
                }}
              >
                <ListSubheader>
                  <em>Órgãos disponíveis em {`Dados/${summary}`}</em>
                </ListSubheader>
                {dataList.map(ag => (
                  <MenuItem key={ag.Name} value={ag.Name}>
                    <LinkTo href={`#${ag.Name}`}>{ag.FullName}</LinkTo>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
  const [year, setYear] = useState(getCurrentYear());
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
      setDataLoading(false);
      console.log(err);
    }
  }
  return (
    <div id={id}>
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
    </div>
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
const LinkTo = styled.a`
  text-decoration: none;
  color: #fff;
`;
