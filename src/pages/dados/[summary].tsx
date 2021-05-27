import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivityIndicator from '../../components/ActivityIndicator';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function DataFromEstate({ summary }) {
  const router = useRouter();
  function handleNavigateBetweenSummaryOptions(option: string) {
    router.push(`/dados/${option}`);
  }
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [dataList, setDataList] = useState<any[]>([1, 2, 3]);
  useEffect(() => {
    setSummaryLoading(true);
    setTimeout(() => {
      setSummaryLoading(false);
      setDataList([1, 2, 3]);
    }, 2000);
  }, [summary]);
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
      <SelectContainer>
        <SumarySelectorComboBox
          value={summary}
          onChange={a => {
            handleNavigateBetweenSummaryOptions(a.target.value);
          }}
        >
          <option>Paraíba</option>
          <option>Paraná</option>
        </SumarySelectorComboBox>
      </SelectContainer>
      <div>
        {(() => {
          if (summaryLoading) {
            return (
              <ActivityIndicatorPlaceholder>
                <ActivityIndicator spinnerColor="#FFF" />
                <span>Carregando dados...</span>
              </ActivityIndicatorPlaceholder>
            );
          }
          if (dataList.length === 0) {
            return 'dados não existem para essa data';
          }
          return dataList.map(() => (
            <GraphWithNavigation title="Total de Remunerações" id={summary} />
          ));
        })()}
      </div>
      <Footer />
    </Page>
  );
}

const GraphWithNavigation: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  const [data, setData] = useState<any>({
    dados: [1, 2, 3, 4],
    name: 'Orgão Top',
  });
  const [year, setYear] = useState(new Date().getFullYear());

  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false);
    }, 2000);
  }, []);
  function generateGraphWithNavigation() {
    if (dataLoading) {
      return (
        <MainGraphSection>
          <ActivityIndicatorPlaceholder fontColor="#3e5363">
            <ActivityIndicator spinnerColor="#3e5363" />
            <span>Aguarde...</span>
          </ActivityIndicatorPlaceholder>
        </MainGraphSection>
      );
    }
    if (data.dados.length === 0) {
      return <>não há dados para esse ano</>;
    }
    return (
      <MainGraphSection>
        <MainGraphSectionHeader>
          <h2>{data.name}</h2>
          <div>
            <button
              className="left"
              onClick={() => setYear(year - 1)}
              type="button"
            >
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
            <span>{year}</span>
            <button onClick={() => setYear(year + 1)} type="button">
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
          </div>
          <span>Dados capturados em 2 de Janeiro de {year}</span>
        </MainGraphSectionHeader>
        <Captions>
          <h3>Total de remunerações em {year}: 21M</h3>
          <ul>
            <CaptionItems>
              <img
                src="/img/data-graph-captions/icon_salario.svg"
                alt="sallary"
              />
              <span>
                Salário:
                <br />
                <b>10M</b>
              </span>
            </CaptionItems>
            <CaptionItems>
              <img
                src="/img/data-graph-captions/icon_beneficio.svg"
                alt="benefits"
              />
              <span>
                Benefícios:
                <br />
                <b>10M</b>
              </span>
            </CaptionItems>
            <CaptionItems>
              <img
                src="/img/data-graph-captions/icon_semdados.svg"
                alt="no-data"
              />
              <span>Sem dados</span>
            </CaptionItems>
          </ul>
        </Captions>
        <GraphDivWithPagination>
          <h3>{title}</h3>
          <div>
            <span>nada ainda</span>
          </div>
        </GraphDivWithPagination>
        <Button
          textColor="#B361C6"
          borderColor="#B361C6"
          backgroundColor="#fff"
          hoverBackgroundColor="#B361C6"
        >
          Explorar Meses
          <img src="/img/icon_calendario.svg" alt="calendario" />
        </Button>
      </MainGraphSection>
    );
  }
  return generateGraphWithNavigation();
};

export const getServerSideProps: GetServerSideProps = async context => {
  const summary = context.params;
  return {
    props: summary,
  };
};

const MainGraphSection = styled.section`
  padding: 5rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  @media (min-width: 600px) {
    margin-left: 8rem;
    margin-right: 8rem;
  }
  margin-bottom: 4rem;
  text-align: center;
  background-color: #fff;
  font-size: 4rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  button {
    font-size: 2rem;
    align-self: flex-end;
    @media (max-width: 600px) {
      align-self: center;
    }
    position: relative;
    img {
      right: 3rem;
      position: absolute;
    }
  }
`;
const GraphDivWithPagination = styled.div`
  padding: 3rem;
  margin-top: 3rem;
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background: #3e5363;
  div {
    display: flex;
    margin-top: 3rem;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    border-top: 1px solid #fff;
    padding: 1rem 1rem;
    font-size: 4rem;
    color: #fff;
    font-family: 'Roboto Condensed', sans-serif;
  }
  margin-bottom: 3rem;
`;
const Captions = styled.div`
  padding: 2rem;
  width: 50%;
  min-width: 34rem;
  justify-content: center;
  background: #3e5363;
  ul {
    list-style: none;
    margin-top: 3rem;
    border-top: 1px solid #fff;
    padding: 1rem 1rem;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
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
    }
    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
  margin-bottom: 10rem;
`;
const CaptionItems = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  img {
    width: 75%;
  }
  span {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: #fff;
    & > * {
      font-size: 1.5rem;
    }
    font-family: 'Roboto Condensed', sans-serif;
  }
`;
const Page = styled.div`
  background: #3e5363;
`;
const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
  justify-content: center;
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
const SumarySelectorComboBox = styled.select`
  padding: 3rem 2rem;
  border-radius: 5px;
  width: 30%;
  min-width: 25rem;
  border: solid 2px #fff;
  background: #3e5363
    url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='5'><path fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")
    no-repeat right 3rem center/8px 10px;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  color: #fff;
  font-weight: bold;
  transition: border 0.2 ease;
  appearance: none;
  option {
    font-size: 2rem;
  }
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &:focus {
    border: 2px solid #3f51b5;
  }
  &:focus-visible {
    border: 2px solid #3f51b5;
  }
`;
