export function downloadURL(url: string) {
  const params = url.replace(process.env.S3_REPO_URL, '');
  return `/download/${params}`;
}
