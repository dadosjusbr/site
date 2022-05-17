import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useEffect, useMemo, useState } from 'react';
import ToggleButton from 'react-toggle-button';
import Footer from '../components/Footer';
import Nav from '../components/Header';
import DropDownGroupSelector from '../components/DropDownGroupSelector';
import RemunerationBarGraph from '../components/RemunerationBarGraph';
import api from '../services/api';

export default function Index({
  agencyAmount,
  monthAmount,
  startDate,
  endDate,
  recordAmount,
  finalValue,
}) {
  const formatedStartDate = useMemo<string>(() => {
    const d = new Date(startDate);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  }, [startDate]);
  const formatedEndDate = useMemo<string>(() => {
    const d = new Date(endDate);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  }, [endDate]);
  const [completeChartData, setCompleteChartData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [loading, setLoading] = useState(true);
  const nextDateIsNavigable = useMemo<boolean>(
    () => year !== new Date().getFullYear(),
    [year],
  );
  const previousDateIsNavigable = useMemo<boolean>(() => year !== 2018, [year]);
  const [indexChart, setIndexChart] = useState(true);
  useEffect(() => {
    fetchGeneralChartData();
  }, [year]);
  async function fetchGeneralChartData() {
    try {
      const { data } = await api.ui.get(`/geral/remuneracao/${year}`);
      setCompleteChartData(
        data.map(d => ({
          BaseRemuneration: d.base_remuneration,
          OtherRemunerations: d.other_remunerations,
          // eslint-disable-next-line no-underscore-dangle
          Month: d._id,
        })),
      );
    } catch (error) {
      setCompleteChartData([]);
    }
    setLoading(false);
  }
  return (
    <Page>
      <Head>
        <title>DadosJusBr</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta property="og:title" content="DadosJusBr" />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro."
        />
      </Head>
      <Nav />
      <Container>
        <section>
          <h2>O DadosJus liberta os dados!</h2>
          <br />
          <GeneralInfoList>
            <li>
              <span>Orgãos libertados: {agencyAmount}</span>
            </li>
            <li>
              <span>Meses libertados: {monthAmount}</span>
            </li>
          </GeneralInfoList>
        </section>
        <DropDownWrapper>
          <h3>Dados Por Grupo</h3>
          <GreenDropDownSelector />
        </DropDownWrapper>
      </Container>
      <Container className="released-data">
        <section>
          Os dados vão de {formatedStartDate} a {formatedEndDate}, e incluem{' '}
          {recordAmount} registros de pagamentos de salários, indenizações,
          gratificações e diárias, somando R${' '}
          {(finalValue / 1000000000).toFixed(2)} bilhões de reais
        </section>
      </Container>
      <GraphWrapper>
        <section>
          <h2>Índice de Transparência</h2>
          <p>
            O Índice de Transparência é composto por duas dimensões: facilidade
            e completude. Cada uma das dimensões, por sua vez, é composta por
            até seis critérios em cada prestação de contas, que são avaliados
            mês a mês. O índice corresponde à média harmônica das duas
            dimensões.
          </p>
          <br />
          <p>
            Conheça mais sobre o{' '}
            <LinkIndice>
              <Link href="/indice">índice de transparência</Link>
            </LinkIndice>
            !
          </p>
          <br />
          <p>
            Dados atualizados até <Negrito>3 Mai de 2022</Negrito>.
          </p>
          <ToggleChartButton>
            <ToggleButton
              inactiveLabel={'MP'}
              activeLabel={'TJ'}
              colors={{
                active: {
                  base: '#3e5363',
                },
                inactive: {
                  base: '#3e5363',
                },
              }}
              value={indexChart}
              onToggle={value => {
                setIndexChart(!value);
              }}
            />
          </ToggleChartButton>
          <ImgGraph>
            <img
              src="/img/indice_legenda.png"
              alt="Legenda do índice de transparência"
            />
            <br />
            {indexChart && (
              <img src="/img/indice_tjs.png" alt="Índice de transparência" />
            )}
            {!indexChart && (
              <img src="/img/indice_mps.png" alt="Índice de transparência" />
            )}
          </ImgGraph>
        </section>
      </GraphWrapper>
      <GraphWrapper>
        <section>
          <h2>Total das remunerações dos membros de todos os órgãos</h2>
          <MainGraphSectionHeader>
            <div>
              <button
                className="left"
                onClick={() => setYear(year - 1)}
                disabled={!previousDateIsNavigable}
                type="button"
              >
                <img src="/img/arrow.svg" alt="seta esquerda" />
              </button>
              <span>{year}</span>
              <button
                disabled={!nextDateIsNavigable}
                onClick={() => setYear(year + 1)}
                type="button"
              >
                <img src="/img/arrow.svg" alt="seta direita" />
              </button>
            </div>
          </MainGraphSectionHeader>
          <RemunerationBarGraph
            year={year}
            data={completeChartData}
            dataLoading={loading}
            billion
          />
        </section>
      </GraphWrapper>
      <Footer />
    </Page>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const { data } = await api.ui.get('/geral/resumo');
    return {
      props: {
        agencyAmount: data.AgencyAmount,
        monthAmount: data.MonthlyTotalsAmount,
        startDate: data.StartDate,
        endDate: data.EndDate,
        recordAmount: `${data.RemunerationRecordsCount}`,
        finalValue: `${data.GeneralRemunerationValue}`,
      },
    };
  } catch (err) {
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
const GraphWrapper = styled.div`
  margin: 2rem 7.8rem;
  font-family: 'Roboto Condensed', sans-serif;
  h2,
  h3 {
    text-align: center;
    font-size: 1.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px;
  }
  section {
    padding-top: 6rem;
    background-color: #fff;
    color: #3e5363;
    width: 100%;
    max-width: 100%;
    justify-content: center;
    flex-direction: column;
  }
  p {
    font-size: 1.8rem;
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;
const Container = styled.div`
  display: flex;
  margin: 0px 68px;
  color: #fff;
  padding-top: 8rem;
  h2,
  h3 {
    font-weight: 200;
    font-size: 3rem !important;
  }
  padding-bottom: 4rem;
  @media (max-width: 600px) {
    padding: 0;
    margin: 0px 20px;
  }
  section {
    font-size: 1rem;
    * {
      font-size: 2rem;
    }
    flex-direction: column;
    font-size: 2rem;
    justify-content: space-between;
    width: 100%;
    margin: 0px 1rem;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    display: flex;
    font-family: 'Roboto Condensed', sans-serif;
  }
  @media (max-width: 600px) {
    section {
      max-width: 100%;
      padding-top: 4rem;
      margin: 0;
      padding-bottom: 4rem;
    }
    flex-direction: column;
  }
  &.first {
    padding-top: 4rem;
    @media (max-width: 600px) {
      padding-top: 3rem;
      div {
        padding-top: 0rem;
      }
    }
  }
  &.released-data {
    margin: 4rem 0;
    padding: 68px;
    background-color: #7f3d8b;
    background-image: url('/img/splash_background.png');
  }
`;
const DropDownWrapper = styled.section`
  width: 100%;
  flex-direction: column;
  div {
    padding: 0;
    max-width: 100%;
    select {
      width: 100%;
      margin: 0;
    }
  }
`;
const GreenDropDownSelector = styled(DropDownGroupSelector)`
  background-color: #2fbb96;
  border: #3e5363;
  margin-top: 120px;
  padding: 3.5rem 2rem;
  font-size: 2.5rem !important;
  width: 80%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const GeneralInfoList = styled.ul`
  list-style: none;
  background-color: #f5f6f7;
  padding: 2rem;
  color: #3e5363;
  li {
    & + li {
      margin-top: 1rem;
    }
    display: flex;
    align-items: center;
  }
`;
const MainGraphSectionHeader = styled.div`
  font-size: 4rem;
  color: #3e5363;
  display: flex;
  width: 100%;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center;
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
    width: 35rem;
    button {
      &:disabled,
      &[disabled] {
        border: 2px solid #3e5363;
        img {
          filter: invert(75%) sepia(56%) saturate(285%) hue-rotate(163deg)
            brightness(87%) contrast(84%);
        }
        background-color: #fff;
      }
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
    }
    @media (max-width: 600px) {
      width: 30rem;
    }
    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 4.5rem;
`;
const ImgGraph = styled.div`
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;
const Negrito = styled.span`
  font-weight: 700;
  font-size: 1.8rem;
`;
const ToggleChartButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 4rem;
`;

const LinkIndice = styled.span`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 2.8rem !important;

  > a:link,
  > a:visited {
    color: #7f3d8b;
  }
`;
