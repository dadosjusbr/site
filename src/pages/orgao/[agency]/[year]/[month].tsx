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
import Footer from '../../../../components/Essentials/Footer';
import Header from '../../../../components/Essentials/Header';
import api from '../../../../services/api';
import OMASummary from '../../../../components/OmaChart';
import ErrorTable from '../../../../components/Common/ErrorTable';
import MonthPopover from '../../../../components/Common/MonthPopover';
import MoreInfoAccordion from '../../../../components/Common/MoreInfoAccordion';

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
  ais,
}: {
  agency: string;
  year: number;
  month: number;
  mi: SummaryzedMI;
  oma: v2AgencySummary;
  previousButtonActive: boolean;
  nextButtonActive: boolean;
  ais: Agency[];
}) {
  const [chartData, setChartData] = useState<AgencyRemuneration>();
  const [loading, setLoading] = useState(true);
  const [agencyInfo, setAgencyInfo] = useState<Agency>();
  function getNextDate() {
    let m = +month;
    let y = +year;
    if (m === 12) {
      m = 1;
      y += 1;
    } else {
      m += 1;
    }
    return { m, y };
  }

  function getPreviousDate() {
    let m = +month;
    let y = +year;
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
    Promise.all([fetchChartData(), fetchAgencyInfo()]);
  }, [year, month]);
  async function fetchChartData() {
    try {
      // frist of all it sets the loading state to loading to feedback the user thats loading the data from api
      setLoading(true);
      const { data }: { data: AgencyRemuneration } = await api.ui.get(
        `/v2/orgao/salario/${agency}/${year}/${month}`,
      );
      // after get the data from api the state is updated with the chart data
      setChartData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  async function fetchAgencyInfo() {
    try {
      const { data: agencyObj }: { data: Agency } = await api.default.get(
        `orgao/${agency}`,
      );
      setAgencyInfo(agencyObj);
    } catch (error) {
      throw new Error(`Erro ao buscar dados mensais do orgão - ${error}`);
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
              ? `Veja os dados de ${month}/${year} do ${oma?.orgao} (${agency})`
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
          <MoreInfoAccordion
            ombudsman={agencyInfo?.ouvidoria}
            timestamp={oma?.timestamp.seconds}
            twitterHandle={agencyInfo?.twitter_handle}
            repository={mi?.dados_coleta?.repositorio_coletor}
          >
            <Typography
              variant="h2"
              title="Mais informações sobre o órgão"
              textAlign="center"
              width="100%"
              pb={0}
            >
              {oma ? oma?.orgao : 'Coleta não realizada!'} (
              {agency.toLocaleUpperCase('pt')})
            </Typography>
          </MoreInfoAccordion>
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
                {MONTHS[month]} {year}
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
                oma?.timestamp && (
                  <Typography textAlign="center">
                    Dados coletados em{' '}
                    {UnixToHumanDate(oma?.timestamp.seconds).getDate()} de{' '}
                    <Sub>
                      {
                        MONTHS[
                          UnixToHumanDate(oma?.timestamp.seconds).getMonth() + 1
                        ]
                      }
                    </Sub>{' '}
                    de {UnixToHumanDate(oma?.timestamp.seconds).getFullYear()}
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
                  maxPerk={oma?.max_outras_remuneracoes}
                  maxWage={oma?.max_remuneracao_base}
                  maxRemuneration={oma?.max_remuneracao}
                  maxDiscounts={oma?.max_descontos}
                  totalMembers={oma?.total_membros}
                  totalPerks={oma?.outras_remuneracoes}
                  totalWage={oma?.remuneracao_base}
                  totalRemuneration={oma?.total_remuneracao}
                  discounts={oma?.descontos}
                  year={year}
                  month={month}
                  mi={mi}
                  selectedAgencies={ais.filter(d => d.id_orgao === agency)}
                />
              );
            }
            return <ErrorTable agency={agencyInfo} month={month} year={year} />;
          })()}
      </Container>
      <Footer />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    agency,
    year: y,
    month: m,
  } = context.params as {
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

  let mi: SummaryzedMI;
  try {
    const { data: d3 } = await api.default.get(
      `/dados/${agency}/${year}/${month}`,
    );
    mi = d3;
  } catch (err) {
    mi = err.response.data;
  }

  let ais: Agency[];
  try {
    const res = await api.default.get('/orgaos');
    ais = res.data;
  } catch (err) {
    ais = [];
  }

  try {
    const { data: d2 }: { data: v2AgencySummary } = await api.ui.get(
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
        oma: d2,
        ais,
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
        previousButtonActive: isAfter(date, new Date(2018, 1, 1)),
        nextButtonActive: isBefore(date, nextMonth),
        ais,
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
