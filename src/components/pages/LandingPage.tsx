import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

export const LandingPage: React.FC = () => (
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
    <Header />
    <BannerWrapper>
      <span>Voltamos em breve!</span>
      <br />
      <br />
      <p>
        O dadosjusbr passou por uma reestruturação para viabilizar análises
        ainda melhores. Em breve o DadosJusBr disponibilizará uma nova estrutura
        de dados de remuneração do sistema de Justiça para controle social
        Agradecemos a compreensão!
      </p>
    </BannerWrapper>
    <Footer />
  </Page>
);
const BannerWrapper = styled.div`
  width: 100%;
  margin: 5rem 0%;
  display: flex;
  flex-direction: column;
  padding: 25rem 20%;
  text-align: center;
  background-color: #fff;
  @media (max-width: 570px) {
    margin: 3rem 0%;
    padding: 10rem 20%;
  }
  span {
    margin-top: 3rem;
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: #3e5363;
  align-items: center;
`;
const Page = styled.div`
  background: #3e5363;
`;
