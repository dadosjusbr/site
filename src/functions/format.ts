function formatAgency(aid: string, name: string): string {
  if (aid == 'TJDFT') {
    return `${aid.substring(0, aid.length - 3)}-${aid.substring(
      aid.length - 3,
      aid.length,
    )}`;
  } else if (
    name.split(' ').includes('Federal') ||
    name.split(' ').includes('Superior') ||
    name.split(' ').includes('Trabalho') ||
    name.split(' ').includes('Conselho')
  ) {
    return aid;
  } else
    return `${aid.substring(0, aid.length - 2)}-${aid.substring(
      aid.length - 2,
      aid.length,
    )}`;
}
export { formatAgency };
