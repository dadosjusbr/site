export function downloadURL(url: string) {
  const params = url.replace(process.env.PACKAGE_REPO_URL, '');
  return `/download/${params}`;
}
