export function buildDownloadRedirectUrl(url: string) {
  const params = url.replace(
    'https://cloud5.lsd.ufcg.edu.br:8080/swift/v1/dadosjusbr/',
    '',
  );
  return `/api/download/datapackage/${params}`;
}
