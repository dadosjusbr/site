import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%;
  }
  body{
    background: #3e5363;
    -webkit-font-smoothing: antialiased;
  }

  button{
    cursor: pointer;
  }

`;
