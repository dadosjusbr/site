import styled from 'styled-components';

export const Container = styled.div`
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
export const NavList = styled.ul`
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
export const NavButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 3.5rem;
`;
export const NavItem = styled.li`
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
