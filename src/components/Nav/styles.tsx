import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 51px 100px;
  border-bottom: 1px solid #fff;
  width: 100%;
  justify-content: space-between;
`;
export const NavList = styled.ul`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`;
export const NavItem = styled.li`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Roboto Condensed', sans-serif;
  line-height: 21px;
  text-align: center;
  a {
    color: #fff;

    text-decoration: none;
  }
`;
