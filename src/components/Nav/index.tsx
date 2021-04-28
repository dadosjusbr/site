import React from 'react';
import Link from 'next/link';

import { Container, NavList, NavItem } from './styles';

const Nav: React.FC = () => (
  <Container>
    <img src="/img/icon_dadosjusbr.svg" alt="logo" />
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
  </Container>
);
export default Nav;
