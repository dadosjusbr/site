const formatAgency = (aid: string): string =>
  `${aid.substring(0, 2)}-${aid.substring(2, 4)}`;

export { formatAgency };
