import Head from 'next/head';
import styled from 'styled-components';
import Header from '../components/Header';

export default function Team() {
  return (
    <Page>
      <Head>
        <title>Equipe</title>
      </Head>
      <Header />
    </Page>
  );
}
const Page = styled.div`
  background: #3e5363;
`;
