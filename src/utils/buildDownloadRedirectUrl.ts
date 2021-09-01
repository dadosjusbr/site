export function buildDownloadRedirectUrl(url: string) {
  const params = url.replace(
    process.env.PACKAGE_REPO_URL,
    '',
  );
  return `/api/download/datapackage/${params}`;
}
