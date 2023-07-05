export const normalizePlotData = (data: AggregateIndexes[]) => {
  const mediasPorAno = {};
  const result = [];

  data.forEach(item => {
    const { detalhe } = item;

    detalhe.forEach(detalheItem => {
      const { ano, indice_transparencia } = detalheItem;

      if (!Object.prototype.hasOwnProperty.call(mediasPorAno, ano)) {
        mediasPorAno[ano] = {
          id_orgao: [],
          agregado: {
            indice_transparencia: [],
            indice_completude: [],
            indice_facilidade: [],
          },
        };
      }

      mediasPorAno[ano].id_orgao.push(ano);
      mediasPorAno[ano].agregado.indice_transparencia.push(
        indice_transparencia.indice_transparencia,
      );
      mediasPorAno[ano].agregado.indice_completude.push(
        indice_transparencia.indice_completude,
      );
      mediasPorAno[ano].agregado.indice_facilidade.push(
        indice_transparencia.indice_facilidade,
      );
    });
  });

  // Calcular as médias
  for (const ano in mediasPorAno) {
    if (Object.prototype.hasOwnProperty.call(mediasPorAno, ano)) {
      const quantidade = mediasPorAno[ano].id_orgao.length;
      const [primeiroIdOrgao] = mediasPorAno[ano].id_orgao;

      mediasPorAno[ano].id_orgao = primeiroIdOrgao;
      mediasPorAno[ano].agregado.indice_transparencia =
        mediasPorAno[ano].agregado.indice_transparencia.reduce(
          (a, b) => a + b,
          0,
        ) / quantidade;
      mediasPorAno[ano].agregado.indice_completude =
        mediasPorAno[ano].agregado.indice_completude.reduce(
          (a, b) => a + b,
          0,
        ) / quantidade;
      mediasPorAno[ano].agregado.indice_facilidade =
        mediasPorAno[ano].agregado.indice_facilidade.reduce(
          (a, b) => a + b,
          0,
        ) / quantidade;

      result.push(mediasPorAno[ano]);
    }
  }

  return result;
};
