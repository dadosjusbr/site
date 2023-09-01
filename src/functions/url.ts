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

export const getParameter = (param: string): string => {
  const urlObject = new URL(window.location.href);
  return urlObject.searchParams.get(param);
};

export const setParameter = (param: string, value: string): string => {
  const urlObject = new URL(window.location.href);
  urlObject.searchParams.set(param, value);
  return urlObject.toString();
};
