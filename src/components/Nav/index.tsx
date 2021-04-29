import React from 'react';
import Link from 'next/link';

import { Container, NavList, NavItem, NavButton } from './styles';

const Nav: React.FC = () => (
  <Container>
    <div>
      <img src="/img/icon_dadosjusbr.svg" alt="logo" />
      <NavButton>
        <img src="/img/nav_responsive_button.svg" alt="nav_responsive" />
      </NavButton>
      <NavList>
        <NavItem>
          <Link href="/">Notícias</Link>
        </NavItem>
        <NavItem>
          <Link href="/">Glossário</Link>
        </NavItem>
        <NavItem>
          <Link href="/">Equipe</Link>
        </NavItem>
        <NavItem>
          <Link href="/">Dados</Link>
        </NavItem>
      </NavList>
    </div>
  </Container>
);
export default Nav;
