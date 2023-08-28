export const setUtmParameters = (
  url: string,
  source: string,
  medium: string,
  campaign: string,
) => {
  const urlObject = new URL(url);
  urlObject.searchParams.set('utm_source', source);
  urlObject.searchParams.set('utm_medium', medium);
  urlObject.searchParams.set('utm_campaign', campaign);

  return urlObject.toString();
};

export const removeUtmParameters = (url: string) => {
  const urlObject = new URL(url);
  urlObject.searchParams.delete('utm_source');
  urlObject.searchParams.delete('utm_medium');
  urlObject.searchParams.delete('utm_campaign');

  return urlObject.toString();
};

export const getParameter = (url: string, param: string): boolean => {
  const urlObject = new URL(url);
  return Boolean(urlObject.searchParams.get(param));
};
