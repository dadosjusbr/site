/* eslint-disable react/no-unescaped-entities */
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addMonths, isAfter, isBefore } from 'date-fns';
import MONTHS from '../../../../@types/MONTHS';
import ActivityIndicator from '../../../../components/ActivityIndicator';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import { api, apiVersion } from '../../../../services/api';
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
      const { data } = await api.get(
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
          [{agency.toUpperCase()}] Folha de Pagameto {month}/{year}
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
      <Header theme="LIGHT" />
      <MainGraphSection>
        <MainGraphSectionHeader>
          <h2>
            {oma ? oma.fullName : 'Coleta não realizada!'} (
            {agency.toLocaleUpperCase('pt')})
          </h2>
          <div>
            <button
              className="left"
              onClick={() => handleNavigateToPreviousSummaryOption()}
              type="button"
              disabled={!previousButtonActive}
            >
              <img src="/img/arrow.svg" alt="seta esquerda" />
            </button>
            <span>
              {MONTHS[month]}, {year}
            </span>
            <button
              onClick={() => handleNavigateToNextSummaryOption()}
              type="button"
              disabled={!nextButtonActive}
            >
              <img src="/img/arrow.svg" alt="seta direita" />
            </button>
          </div>
          {loading ? (
            <ActivityIndicatorPlaceholder fontColor="#3e5363">
              <ActivityIndicator spinnerColor="#3e5363" />
              <span>Carregando...</span>
            </ActivityIndicatorPlaceholder>
          ) : (
            (() =>
              !oma ? (
                <ActivityIndicatorPlaceholder fontColor="#3e5363">
                  Não há dados para esse mês
                </ActivityIndicatorPlaceholder>
              ) : (
                oma.crawlingTime && (
                  <span>
                    Dados capturados em{' '}
                    {(() => {
                      // Converts UNIX timestamp to miliseconds timestamp
                      const d = new Date(oma.crawlingTime * 1000);
                      // eslint-disable-next-line prettier/prettier
                      return `${d.getDay()} de ${
                        MONTHS[d.getMonth()]
                      } de ${d.getFullYear()}`;
                    })()}
                  </span>
                )
              ))()
          )}
        </MainGraphSectionHeader>
        {oma &&
          (() => {
            if (loading) {
              return (
                <ActivityIndicatorPlaceholder fontColor="#3e5363">
                  <ActivityIndicator spinnerColor="#3e5363" />
                  <span>Carregando dados...</span>
                </ActivityIndicatorPlaceholder>
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
      </MainGraphSection>
      <Footer theme="LIGHT" />
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

  const { data: d3 } = await apiVersion.get(
    `/dados/${agency}/${year}/${month}`,
  );

  try {
    const { data: d2 } = await api.get(
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
  background: #fff;
`;

const MainGraphSection = styled.section`
  margin-top: 3rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (min-width: 600px) {
    margin-bottom: 4rem;
    margin-left: 8rem;
    margin-right: 8rem;
  }
  text-align: center;
  font-size: 4rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  .buttons {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    div {
      @media (max-width: 600px) {
        justify-content: center;
      }
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      & + div {
        button:hover {
          img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }
    @media (max-width: 600px) {
      justify-content: center;
    }
    button {
      font-size: 2rem;
      margin: 1rem;
      position: relative;
      img {
        right: 3rem;
        position: absolute;
      }
    }
  }
`;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  width: 35rem;
  flex-direction: column;
  align-items: center;
  align-self: center;
  h2 {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
  span {
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 400;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    button {
      &.left {
        transform: rotate(180deg);
      }
      img {
        position: initial;
      }
      width: 30px;
      color: #3e5363;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background-color: #3e5363;
      &:disabled,
      &[disabled] {
        border: 2px solid #3e5363;
        img {
          filter: invert(75%) sepia(56%) saturate(285%) hue-rotate(163deg)
            brightness(87%) contrast(84%);
        }
        background-color: #fff;
      }
    }
    span {
      img {
        position: initial;
      }
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
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
