import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { usePrivacityPolicy } from '../contexts/privacity-policy-context';

const PrivacityPolicyPopUp: React.FC = () => {
  const { acceptCookies } = usePrivacityPolicy();
  return (
    <Container>
      <span>
        O DadosJusBr utiliza Cookies para melhorar a experiencia do usuário
        dentro do nosso sistema, ao navegar você concorda com a nossa{' '}
        <Link href="/politica-de-privacidade">política de privacidade</Link>.
      </span>
      {/* here we send the information to PrivacityPolicyContext to allow the cookie storing */}
      <button type="button" onClick={acceptCookies}>
        Entendido
      </button>
    </Container>
  );
};
export const Container = styled.div`
  position: fixed;
  background-color: #3e5363;
  bottom: 2rem;
  width: 98%;
  left: 0;
  right: 0;
  padding: 2.5rem;
  color: #fff;
  font-size: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 -5px 20px rgba(0, 0, 0, 0.23);
  font-family: 'Roboto Condensed', sans-serif;
  margin-left: auto;
  margin-right: auto;
  span {
    font-size: 1.5rem;
    a {
      font-size: 1.5rem;
      color: #47abff;
      text-decoration: underline;
    }
  }
  @media (max-width: 600px) {
    bottom: 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0px -6px 6px rgba(0, 0, 0, 0.23);
    width: 100%;
  }

  button {
    margin-top: 1rem;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: bold;
    padding: 1rem;
    border: 2px solid #3e5363;
    width: 100%;
    color: #3e5363;
    transition: background 0.2s ease;
    &:hover {
      color: #fff;
      border: 2px solid #fff;
      background-color: #3e5363;
    }
  }
`;

export default PrivacityPolicyPopUp;
