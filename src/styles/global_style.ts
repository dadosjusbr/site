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
  .container,
  .container-fluid,
  .container-xxl,
  .container-xl,
  .container-lg,
  .container-md,
  .container-sm {
    width: 100%;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 576px) {
    .container-sm, .container {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    .container-md, .container-sm, .container {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .container-lg, .container-md, .container-sm, .container {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1140px;
    }
  }
  @media (min-width: 1400px) {
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
      max-width: 1320px;
    }
  }
`;
