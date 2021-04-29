import GlobalStyle from '../styles/global';

/*
o _app.tsx nesse caso está sendo utilizado para conseguirmos
usar a api de contextos do next, ela permite compartilharmos funcionalidades
entre as páginas de forma dinamica.
https://nextjs.org/docs/advanced-features/custom-app
*/
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
