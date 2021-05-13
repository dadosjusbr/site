import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%;
  }
  body{
    -webkit-font-smoothing: antialiased;
  }
  a{
    text-decoration: none;
  }
  button{
    cursor: pointer;
  }

`;
