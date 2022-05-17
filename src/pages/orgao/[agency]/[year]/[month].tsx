/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addMonths, isAfter, isBefore } from 'date-fns';
import {
  Box,
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
        `/orgao/salario/${agency}/${year}/${month}`,
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
  return (
    <Page>
      <Head>
        <title>
          [{agency.toUpperCase()}] Folha de Pagamento {month}/{year}
        </title>
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
          <Box textAlign="center">
            <IconButton
              aria-label="voltar"
              color="info"
              onClick={() => handleNavigateToPreviousSummaryOption()}
              disabled={!previousButtonActive}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography component="span" variant="h6">
              {MONTHS[month]}, {year}
            </Typography>
            <IconButton
              aria-label="voltar"
              color="info"
              onClick={() => handleNavigateToNextSummaryOption()}
              disabled={!nextButtonActive}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {/* <div>
            <button
              className="left"
              onClick={() => handleNavigateToPreviousSummaryOption()}
              type="button"
              disabled={!previousButtonActive}
            >
              <img src="/img/arrow.svg" alt="seta esquerda" />
            </button>
            <span>
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={() => handleNavigateToNextSummaryOption()}
              type="button"
              disabled={!nextButtonActive}
            >
              <img src="/img/arrow.svg" alt="seta direita" />
            </button>
          </div> */}
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
                  <div>
                    <CircularProgress color="info" />
                  </div>
                  <p>Não há dados para esse mês</p>
                </Box>
              ) : (
                oma.crawlingTime && (
                  <Typography textAlign="center">
                    Dados coletados em{' '}
                    {(() => {
                      // Converts UNIX timestamp to miliseconds timestamp
                      const d = new Date(oma.crawlingTime * 1000);
                      // eslint-disable-next-line prettier/prettier
                      return `${d.getDate()} de ${
                        MONTHS[d.getMonth() + 1]
                      } de ${d.getFullYear()}`;
                    })()}
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
            if (!chartData.ProcInfo) {
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
            return (
              <ErrorTable
                agency={agency}
                month={month}
                year={year}
                error={chartData.ProcInfo}
              />
            );
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

  const { data: d3 } = await api.default.get(
    `/dados/${agency}/${year}/${month}`,
  );

  try {
    const { data: d2 } = await api.ui.get(
      `/orgao/resumo/${agency}/${year}/${month}`,
    );
    return {
      props: {
        agency,
        year,
        month,
        mi: d3[0],
        previousButtonActive: d2.HasPrevious,
        nextButtonActive: d2.HasNext,
        oma: {
          fullName: d2.FullName,
          totalMembers: d2.TotalMembers,
          maxWage: d2.MaxWage,
          totalWage: d2.TotalWage,
          maxPerk: d2.MaxPerk,
          totalPerks: d2.TotalPerks,
          crawlingTime: d2.CrawlingTime && d2.CrawlingTime.seconds,
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
        mi: d3[0],
        previousButtonActive: isAfter(date, new Date(2018, 1, 1)),
        nextButtonActive: isBefore(date, nextMonth),
      },
    };
  }
};
const Page = styled.div`
  background: #3e5363;
`;
