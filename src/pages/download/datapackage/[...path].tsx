import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
// this function is called in nextjs server like an backend route, it pipes the download stream from the dowloaded package into the route response, to allow download files using our own server
export const getServerSideProps: GetServerSideProps = async ctx => {
  // gets the the variable path from next spread param and uses the params array to map to the external path
  const params = (ctx.params.path as string[]).join('/');
  return {
    props: {
      params,
    },
  };
};
export default function Download({ params }) {
  useEffect(() => {
    window.close();
  }, []);
  return (
    <>
      <Head>
        <meta
          httpEquiv="refresh"
          content={`2;url=${process.env.PACKAGE_REPO_URL}${params}`}
        />
      </Head>
      <p>downloading...</p>
    </>
  );
}
