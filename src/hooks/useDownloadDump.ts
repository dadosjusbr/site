import COLLECT_INFOS from '../@types/COLLECT_INFOS';

/**
 * Hook that returns a file link and the creation date for downloading a dump.
 * @returns An array containing the file link and the creation date.
 */
export const useDownloadDump = (): [fileLink: string, dumpDate: string] => {
  const aux_date = new Date();
  const aux_month = aux_date.getMonth();

  const date = new Date(
    aux_date.getFullYear(),
    aux_date.getDate() < COLLECT_INFOS.COLLECT_DATE ? aux_month - 1 : aux_month,
  );

  const dumpDate = ` 01/2018 - ${date.toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric',
  })}`;
  const fileLink = `https://dadosjusbr.org/download/dumps/dadosjusbr-${date.getFullYear()}-${date.toLocaleDateString(
    'pt-BR',
    {
      month: 'numeric',
    },
  )}.zip`;

  return [fileLink, dumpDate];
};
