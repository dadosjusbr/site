import Head from 'next/head';
import Nav from '../components/Header';

export default function Index() {
  return (
    <>
      <Head>
        <title>DadosJusBr</title>
      </Head>
      <Nav />
      <h1>Hello World!</h1>
    </>
  );
}
