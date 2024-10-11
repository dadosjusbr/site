function formatAgency(aid: string): string {
  const strNumbers = extractNumbers(aid);

  if (aid.toLowerCase() === 'tjdft' || aid.toLowerCase() === 'mpdft')
    return `${aid.substring(0, 2)}-${aid.substring(2, 5)}`;

  if (strNumbers > 0) return `${aid.replace(/\d+/g, '')}-${strNumbers}`;

  if (aid.length > 3)
    return `${aid.substring(0, aid.length - 2)}-${aid.substring(
      aid.length - 2,
      aid.length,
    )}`;

  return aid;
}

function extractNumbers(str: string): number {
  const matches = str.match(/\d+$/);
  return matches ? parseInt(matches[0], 10) : -1;
}

function orderStringsWithNum(string1: string, string2: string) {
  const num1 = extractNumbers(string1);
  const num2 = extractNumbers(string2);

  const texto1 = string1.replace(/\d+$/, '');
  const texto2 = string2.replace(/\d+$/, '');

  if (texto1 < texto2) {
    return -1;
  }
  if (texto1 > texto2) {
    return 1;
  }

  return num1 - num2;
}

function formatToAgency(input: string): string {
  const words = input?.split('-');

  const formattedWords = words?.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    return `${firstLetter}${remainingLetters}`;
  });

  return formattedWords?.join(' ');
}

const formatCurrencyValue = (value: number, decimal_places = 0): string =>
  value?.toLocaleString('pt-BR', {
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

export {
  formatAgency,
  extractNumbers,
  formatToAgency,
  formatCurrencyValue,
  formatBytes,
  orderStringsWithNum,
};
