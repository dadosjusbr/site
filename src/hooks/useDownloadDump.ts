import COLLECT_INFOS from '../@types/COLLECT_INFOS';
import { getCurrentYear } from '../functions/currentYear';

/**
 * Hook that returns a file link and the creation date for downloading a dump.
 * @returns An array containing the file link and the creation date.
 */
export const useDownloadDump = (): [fileLink: string, dumpDate: string] => {
  const current_year = getCurrentYear();
  const aux_date = new Date();
  const aux_month = aux_date.getMonth();

  const date = new Date(
    current_year,
    aux_date.getDate() <= COLLECT_INFOS.COLLECT_DATE
      ? aux_month - 1
      : aux_month,
  );
  const dumpDate = ` 01/2018 - ${date.toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric',
  })}`;
  const fileLink = `https://dadosjusbr.org/download/dumps/dadosjusbr-${current_year}-${date.toLocaleDateString(
    'pt-BR',
    {
      month: 'numeric',
    },
  )}.zip`;

  return [fileLink, dumpDate];
};
