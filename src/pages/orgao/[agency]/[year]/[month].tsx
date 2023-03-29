/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addMonths, isAfter, isBefore } from 'date-fns';
import {
  Box,
  Grid,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MONTHS from '../../../../@types/MONTHS';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import api from '../../../../services/api';
import OMASummary from '../../../../components/OmaChart';
import ErrorTable from '../../../../components/ErrorTable';
import MonthPopover from '../../../../components/MonthPopover';

function UnixToHumanDate(unix) {
  const d = new Date(unix * 1000);
  return d;
}

export default function OmaPage({
  agency,
  year,
  month,
  mi,
  oma,
  previousButtonActive,
  nextButtonActive,
}) {
  const [chartData, setChartData] = useState<any>();
  const [loading, setLoading] = useState(true);
  function getNextDate() {
    let m = parseInt(month, 10);
    let y = parseInt(year, 10);
    if (m === 12) {
      m = 1;
      y += 1;
    } else {
      m += 1;
    }
    return { m, y };
  }

  function getPreviousDate() {
    let m = parseInt(month, 10);
    let y = parseInt(year, 10);
    if (m === 1) {
      m = 12;
      y -= 1;
    } else {
      m -= 1;
    }
    return { m, y };
  }

  const router = useRouter();

  // this effect is using the page changing as a hook to fetch the data from api
  useEffect(() => {
    // then it checks the next and the previous year to block the navigation buttons or to help to choose the right year
    // finally it fetchs the data from the api to fill the chart with the agency/month/year data
    fetchChartData();
  }, [year, month]);
  async function fetchChartData() {
    try {
      // frist of all it sets the loading state to loading to feedback the user thats loading the data from api
      setLoading(true);
      const { data } = await api.ui.get(
        `/v2/orgao/salario/${agency}/${year}/${month}`,
      );
      // after get the data from api the state is updated with the chart data
      setChartData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  function handleNavigateToNextSummaryOption() {
    const { m, y } = getNextDate();
    setLoading(true);
    router.push(`/orgao/${agency}/${y}/${m}`);
  }
  function handleNavigateToPreviousSummaryOption() {
    const { m, y } = getPreviousDate();
    setLoading(true);
    router.push(`/orgao/${agency}/${y}/${m}`);
  }
  const pageTitle = `[${agency.toUpperCase()}] Folha de Pagamento ${month}/${year}`;
  return (
    <Page>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={
            oma
              ? `Veja os dados de ${month}/${year} do ${oma.fullName} (${agency})`
              : `Dados não coletados`
          }
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header />
      <Container fixed>
        <Box py={4}>
          <Typography variant="h2" textAlign="center">
            {oma ? oma.fullName : 'Coleta não realizada!'} (
            {agency.toLocaleUpperCase('pt')})
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <IconButton
                aria-label="voltar"
                color="info"
                onClick={() => handleNavigateToPreviousSummaryOption()}
                disabled={!previousButtonActive}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <MonthPopover agency={agency} year={year}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  sx={{ cursor: 'pointer' }}
                >
                  {MONTHS[month]} {year}
                </Typography>
              </MonthPopover>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="voltar"
                color="info"
                onClick={() => handleNavigateToNextSummaryOption()}
                disabled={!nextButtonActive}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
          {loading ? (
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
          ) : (
            (() =>
              !oma ? (
                <Box
                  m={4}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">
                    Não há dados para esse mês
                  </Typography>
                </Box>
              ) : (
                oma.crawlingTime && (
                  <Typography textAlign="center">
                    Dados coletados em{' '}
                    {UnixToHumanDate(oma.crawlingTime).getDate()} de{' '}
                    <Sub>
                      {MONTHS[UnixToHumanDate(oma.crawlingTime).getMonth() + 1]}
                    </Sub>{' '}
                    de {UnixToHumanDate(oma.crawlingTime).getFullYear()}
                  </Typography>
                )
              ))()
          )}
        </Box>
        {oma &&
          (() => {
            if (loading) {
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
            }
            if (!chartData.proc_info) {
              return (
                <OMASummary
                  agency={agency}
                  chartData={chartData}
                  maxPerk={oma.maxPerk}
                  maxWage={oma.maxWage}
                  totalMembers={oma.totalMembers}
                  totalPerks={oma.totalPerks}
                  totalWage={oma.totalWage}
                  year={year}
                  month={month}
                  mi={mi}
                />
              );
            }
            return <ErrorTable agency={agency} month={month} year={year} />;
          })()}
      </Container>
      <Footer />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { agency, year: y, month: m } = context.params as {
    agency: string;
    year: string;
    month: string;
  };
  const year = parseInt(y, 10);
  const month = parseInt(m, 10);

  if (Number.isNaN(year) || Number.isNaN(month)) {
    return {
      redirect: {
        destination: '/404',
      },
      props: {},
    };
  }

  if (month > 12 || month < 1) {
    return {
      redirect: {
        destination: '/404',
      },
      props: {},
    };
  }

  let mi = [];
  try {
    const { data: d3 } = await api.default.get(
      `/dados/${agency}/${year}/${month}`,
    );
    mi = d3;
  } catch (err) {
    mi = [];
  }

  try {
    const { data: d2 } = await api.ui.get(
      `/v2/orgao/resumo/${agency}/${year}/${month}`,
    );
    return {
      props: {
        agency,
        year,
        month,
        mi,
        previousButtonActive: d2.tem_anterior,
        nextButtonActive: d2.tem_proximo,
        oma: {
          fullName: d2.orgao,
          totalMembers: d2.total_membros,
          maxWage: d2.max_remuneracao_base,
          totalWage: d2.total_remuneracao,
          maxPerk: d2.max_outras_remuneracoes,
          totalPerks: d2.outras_remuneracoes,
          crawlingTime: d2.timestamp && d2.timestamp.seconds,
        },
      },
    };
  } catch (err) {
    const nextMonth = addMonths(new Date(), 1);
    const date = new Date(year, month, 1);
    return {
      props: {
        agency,
        year,
        month,
        mi,
        previousButtonActive: isAfter(date, new Date(2018, 1, 1)),
        nextButtonActive: isBefore(date, nextMonth),
      },
    };
  }
};
const Page = styled.div`
  background: #3e5363;
`;
const Sub = styled.span`
  text-transform: lowercase;
`;
