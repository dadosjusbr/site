import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
// here we're using the functionality of API ROUTES from next js to optmize the download pipe using dadosjusbr url
// the function is very similar to a serverless function (like aws lambda) and must to be inside /pages/api folder
// this function is called in nextjs server like an backend route, it pipes the download stream from the dowloaded package into the route response, to allow download files using our own server
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // gets the the variable path from next spread param and uses the params array to map to the external path
  const params = (req.query.path as string[]).join('/');
  const request = https.get(process.env.S3_REPO_URL + params, response => {
    response.pipe(res);
  });
  request.on('close', () => {
    res.end();
  });
};
