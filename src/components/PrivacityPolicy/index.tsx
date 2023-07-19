import React from 'react';
import { Button, Link } from '@mui/material';
import styled from 'styled-components';

import { usePrivacityPolicy } from '../../contexts/privacity-policy-context';

const PrivacityPolicyPopUp: React.FC = () => {
  const { acceptCookies } = usePrivacityPolicy();
  return (
    <Container>
      <p>
        O DadosJusBr utiliza Cookies para melhorar a experiencia do usuário
        dentro do nosso sistema, ao navegar você concorda com a nossa{' '}
        <Link color="inherit" href="/politica-de-privacidade">
          política de privacidade
        </Link>
        .
      </p>
      {/* here we send the information to PrivacityPolicyContext to allow the cookie storing */}
      <Button
        variant="contained"
        color="info"
        onClick={acceptCookies}
        sx={{ width: '100%' }}
      >
        Entendido
      </Button>
    </Container>
  );
};
export const Container = styled.div`
  z-index: 1;
  width: 100%;
  position: fixed;
  background-color: #3e5363;
  bottom: 0;
  padding: 1.5rem;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
`;

export default PrivacityPolicyPopUp;
