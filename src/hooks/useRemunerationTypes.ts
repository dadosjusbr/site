const generateDataTypeSuffix = (graphType: string, dataType: string) => {
  switch (graphType) {
    case 'media-por-membro':
      return `${dataType}_por_membro`;
    case 'media-mensal':
      return `${dataType}_por_mes`;
    default:
      return dataType;
  }
};

/**
 * Custom hook to generate remuneration types based on the graph type.
 *
 * @param graphType - The type of graph.
 * @returns An array of strigs with all the remuneration datatypes.
 */
export const useRemunerationDataTypes = (
  graphType: string,
): [
  baseRemunerationDataTypes: string,
  otherRemunerationsDataTypes: string,
  discountsDataTypes: string,
] => {
  const baseRemunerationDataTypes = generateDataTypeSuffix(
    graphType,
    'remuneracao_base',
  );
  const otherRemunerationsDataTypes = generateDataTypeSuffix(
    graphType,
    'outras_remuneracoes',
  );
  const discountsDataTypes = generateDataTypeSuffix(graphType, 'descontos');

  return [
    baseRemunerationDataTypes,
    otherRemunerationsDataTypes,
    discountsDataTypes,
  ];
};
