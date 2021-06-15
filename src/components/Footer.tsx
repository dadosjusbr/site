import { HTMLAttributes } from 'react';
import styled from 'styled-components';

// The footer is a component that appears at various times in the application
// It consists of DadosJus logo and a message for contact.
export interface FooterPropos extends HTMLAttributes<HTMLDivElement> {
  theme?: 'DEFAULT' | 'LIGHT';
}

const Footer: React.FC<FooterPropos> = ({ theme = 'DEFAULT', ...rest }) => (
  <Container {...rest}>
    <div>
      <img
        src={
          theme === 'DEFAULT'
            ? '/img/footer/icon_dadosjusbr_dafault.svg'
            : '/img/footer/icon_dadosjusbr_light.svg'
        }
        alt="dados_jus_logo"
      />
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
    border-top: 2px solid ${p => (p.theme === 'DEFAULT' ? '#fff' : '#3e5363')};
    span {
      color: ${p => (p.theme === 'DEFAULT' ? '#fff' : '#3e5363')};
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 2rem;
      * {
        color: ${p => (p.theme === 'DEFAULT' ? '#fff' : '#3e5363')};
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 2rem;
      }
      width: 70%;
    }
    display: flex;
    padding: 60px 40px 5rem;
    width: 90%;
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 60px 0px 0px;
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
