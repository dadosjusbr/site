import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <Container>
    <div>
      <img src="/img/icon_dadosjusbr.svg" alt="logo" />
      <span>
        Alguma dica? Tem algum feedback geral? Se você tiver uma ideia que você
        gostaria de ver no DadosJusBr, envie-nos um e-mail{' '}
        <a href="/">dadosjusbr@gmail.com</a> ou visite nosso{' '}
        <a href="/">github</a> .
      </span>
    </div>
  </Container>
);

export default Footer;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  div {
    border-top: 2px solid #fff;
    span {
      color: #fff;
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 2rem;
      * {
        color: #fff;
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 2rem;
      }
      width: 70%;
    }
    display: flex;
    padding: 60px 40px 80px;
    width: 90%;
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 60px 0px 80px;
    img {
      display: none;
    }
    div {
      span {
        width: 100%;
      }
    }
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
