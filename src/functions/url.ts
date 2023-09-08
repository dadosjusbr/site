import { months } from '../@types/MONTHS';
import { getCurrentYear } from './currentYear';

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

export const getSearchUrlParameter = (paramKey: string, ais: Agency[]) => {
  const r = new URL(window.location.href);
  switch (paramKey) {
    case 'anos':
      return r.searchParams.get(paramKey)
        ? +r.searchParams.get(paramKey)
        : getCurrentYear();

    case 'meses': {
      const meses = r.searchParams.get(paramKey)
        ? r.searchParams.get(paramKey).split(',')
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const mesesSelecionados = meses.map(m => ({
        label: months[parseInt(m, 10) - 1],
      }));
      return mesesSelecionados.map(m => m.label);
    }

    case 'categorias':
      switch (r.searchParams.get(paramKey)) {
        case 'descontos':
          return 'Descontos';

        case 'base':
          return 'Remuneração base';

        case 'outras':
          return 'Outras remunerações';

        default:
          return 'Tudo';
      }

    case 'orgaos': {
      const orgaos = r.searchParams.get(paramKey)
        ? r.searchParams.get(paramKey).split(',')
        : [];
      const orgaosSelecionados = orgaos.map(o =>
        ais.find(a => a.id_orgao === o),
      );
      return orgaosSelecionados.length > 1 ? orgaosSelecionados : ais;
    }
    default:
      break;
  }
  return r.searchParams.get(paramKey);
};
