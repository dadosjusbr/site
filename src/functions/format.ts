function formatAgency(aid: string): string {
  if (aid.toLowerCase() === 'tjdft' || aid.toLowerCase() === 'mpdft')
    return `${aid.substring(0, 2)}-${aid.substring(2, 5)}`;
  if (
    aid.toLowerCase().startsWith('trt') ||
    aid.toLowerCase().startsWith('trf')
  )
    return aid;
  if (aid.length === 4) return `${aid.substring(0, 2)}-${aid.substring(2, 4)}`;
  if (aid.length === 5) return `${aid.substring(0, 3)}-${aid.substring(3, 5)}`;
  return aid;
}

const formatCurrencyValue = (value: number, decimal_places = 0): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: decimal_places,
    minimumFractionDigits: decimal_places,
    notation: 'compact',
  });

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / 1024 ** i).toFixed(dm))} ${sizes[i]}`;
};
export { formatAgency, formatCurrencyValue, formatBytes };
