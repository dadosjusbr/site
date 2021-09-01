import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

// this function is called in nextjs server like an backend route, it pipes the download stream from the dowloaded package into the route response, to allow download files using our own server
export default async (
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> => {
  // gets the the variable path from next spread param and uses the params array to map to the external path
  const params = (<string[]>request.query.path).join('/');
  https.get(process.env.PACKAGE_REPO_URL + params, res => {
    res.pipe(response);
  });
};
