import Link from 'next/link';
import { HTMLAttributes, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// The header partial is used to navigate and brief the application
// each link is an anchor to a different page, achoring using next/link https://nextjs.org/docs/api-reference/next/link
export interface HeaderPropos extends HTMLAttributes<HTMLDivElement> {
  theme?: 'DEFAULT' | 'LIGHT';
}

const Header: React.FC<HeaderPropos> = ({ theme = 'DEFAULT', ...rest }) => {
  // this method is used to change the application state to modify the context of multiples elements
  function handleClick() {
    setOpen(!open);
  }
  // Registering a new application state property called open.
  // This prop is used to modify the the header based on the mouse
  // click.
  const [open, setOpen] = useState(false);
  return (
    <Container {...rest}>
      <div>
        <Link href="/">
          <button type="button" id="back-to-start">
            <img
              src={
                theme === 'DEFAULT'
                  ? '/img/header/icon_dadosjusbr_default.svg'
                  : '/img/header/icon_dadosjusbr_light.svg'
              }
              alt="dados_jus_logo"
            />
          </button>
        </Link>
        <HeaderButton open={open} onClick={handleClick}>
          <img
            src={
              theme === 'DEFAULT'
                ? '/img/nav_responsive_button.svg'
                : '/img/nav_responsive_button_light.svg'
            }
            alt="nav_responsive"
          />
        </HeaderButton>
        <HeaderList open={open}>
          <HeaderItem>
            <Link href="/">Inicio</Link>
          </HeaderItem>
          <HeaderItem>
            <Link href="/equipe">Equipe</Link>
          </HeaderItem>
          <HeaderItem>
            <Link href="/dados/PB">Dados</Link>
          </HeaderItem>
        </HeaderList>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  div {
    #back-to-start {
      background: none;
      border: none;
    }
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

const opening = keyframes`
  from{
    left: 200px;
  }
  to{
    left:0;
  }
`;

const HeaderList = styled.ul<{ open: boolean }>`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 3.5rem;

  @media (max-width: 600px) {
    display: ${props => (props.open ? 'flex' : 'none')};
    z-index: 10;
    position: fixed;
    overflow: hidden;
    animation: ${opening} 0.3s forwards;
    transition: 0.5s;
    width: 100%;
    top: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #3e5363;
  }
`;
const HeaderButton = styled.button<{ open: boolean }>`
  display: none;
  background: none;
  border: none;
  z-index: 100;
  padding: 3.5rem;
  right: ${props => props.open && '20px'};
  position: ${props => props.open && 'fixed'};
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
    transition: border 0.1s;
    &:hover {
      border-bottom: 5px solid #fff;
    }
  }
`;
export default Header;
