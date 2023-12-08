import COLLECT_INFOS from '../@types/COLLECT_INFOS';
import { getCurrentYear } from '../functions/currentYear';

/**
 * Hook that returns a file link and the creation date for downloading a dump.
 * @returns An array containing the file link and the creation date.
 */
export const useDownloadDump = (): [string, string] => {
  const date = new Date(
    getCurrentYear(),
    new Date().getDate() < COLLECT_INFOS.COLLECT_DATE
      ? new Date().getMonth() - 1
      : new Date().getMonth(),
  );
  const dumpDate = ` 01/2018 - ${date.toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric',
  })}`;
  const fileLink = `https://dadosjusbr.org/download/dumps/dadosjusbr-${getCurrentYear()}-${date.toLocaleDateString(
    'pt-BR',
    {
      month: 'numeric',
    },
  )}.zip`;

  return [fileLink, dumpDate];
};
