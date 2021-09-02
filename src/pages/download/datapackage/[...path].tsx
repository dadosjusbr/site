import { GetServerSideProps } from 'next';
import https from 'https';
// this function is called in nextjs server like an backend route, it pipes the download stream from the dowloaded package into the route response, to allow download files using our own server
export const getServerSideProps: GetServerSideProps = async ctx => {
  // gets the the variable path from next spread param and uses the params array to map to the external path
  const params = (ctx.params.path as string[]).join('/');
  await new Promise((resolve, reject) => {
    https.get(process.env.PACKAGE_REPO_URL + params, res => {
      res.pipe(ctx.res);
      res.on('end', () => {
        resolve(undefined);
      });
      res.on('error', err => reject(err));
    });
  });
  return {
    props: {},
  };
};
export default function Download() {
  return (
    <>
      <p>downloading...</p>
    </>
  );
}
