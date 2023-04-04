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
export { formatAgency };
