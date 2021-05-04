import Link from 'next/link';
import styled from 'styled-components';

// The header partial is used to navigate and brief the application
// each link is an anchor to a different page, achoring using next/link https://nextjs.org/docs/api-reference/next/link

const Header = () => (
  <Container>
    <div>
      <img src="/img/icon_dadosjusbr.svg" alt="dados_jus_logo" />
      <HeaderButton>
        <img src="/img/nav_responsive_button.svg" alt="nav_responsive" />
      </HeaderButton>
      <HeaderList>
        <HeaderItem>
          <Link href="/">Notícias</Link>
        </HeaderItem>
        <HeaderItem>
          <Link href="/">Glossário</Link>
        </HeaderItem>
        <HeaderItem>
          <Link href="/">Equipe</Link>
        </HeaderItem>
        <HeaderItem>
          <Link href="/">Dados</Link>
        </HeaderItem>
      </HeaderList>
    </div>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  div {
    display: flex;

    padding: 51px 10px 34px;
    border-bottom: 2px solid #fff;
    width: 90%;
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    button {
      display: block;
    }
  }
`;
const HeaderList = styled.ul`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 3.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;
const HeaderButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 3.5rem;
`;
const HeaderItem = styled.li`
  padding: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  font-family: 'Roboto Condensed', sans-serif;
  line-height: 21px;
  text-align: center;
  a {
    color: #fff;

    text-decoration: none;
  }
`;
export default Header;
