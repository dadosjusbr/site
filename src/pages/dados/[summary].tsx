import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function DataFromEstate({ summary }) {
  const router = useRouter();
  function handleNavigateBetweenSummaryOptions(option: string) {
    router.push(`/dados/${option}`);
  }
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<any[]>([1, 2, 3]);
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
          if (loading) {
            return 'carregando...';
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
}) => (
  <MainGraphDiv>
    <Captions>
      <h2>{title}</h2>
    </Captions>
    <GraphDivWithPaging>
      <h2>{title}</h2>
    </GraphDivWithPaging>
  </MainGraphDiv>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ['/dados/Paraná', '/dados/Paraíba'],
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    summary: params.summary,
  },
});
const MainGraphDiv = styled.div`
  padding: 5rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
  text-align: center;
  background-color: #fff;
  font-size: 4rem;
  color: #fff;
  font-family: 'Roboto Condensed', sans-serif;
`;
const GraphDivWithPaging = styled.div`
  padding: 3rem;
  margin-top: 3rem;
  display: flex;
  align-self: center;
  justify-content: center;
  width: 100%;
  background: #3e5363;
`;
const Captions = styled.div`
  padding: 3rem;
  width: 40%;
  min-width: 34rem;
  justify-content: center;
  background: #3e5363;
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
const SumarySelectorComboBox = styled.select`
  padding: 3rem 2rem;
  border-radius: 5px;
  width: 30%;
  min-width: 25rem;
  border: solid 2px #fff;
  font-size: 2rem;
  font-family: 'Roboto Condensed', sans-serif;
  display: flex;
  background-color: #3e5363;
  color: #fff;
  font-weight: bold;
  transition: border 0.2 ease;
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
