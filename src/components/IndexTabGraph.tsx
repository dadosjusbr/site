import { useRef, useEffect } from 'react';
import * as Plot from '@observablehq/plot';
import styled from 'styled-components';
import { Box, useMediaQuery } from '@mui/material';
import { formatAgency } from '../functions/format';
import IndexChartLegend from './IndexChartLegend';

export default function IndexTabGraph({
  plotData,
  height = 700,
  mobileHeight = 1400,
}: {
  plotData: AggregateIndexes[];
  height?: number;
  mobileHeight?: number;
}) {
  const ref = useRef(null);
  const isMobile = useMediaQuery('(max-width: 900px)');

  const data = plotData?.map((item: AggregateIndexes) => ({
    nome: formatAgency(item.id_orgao).toUpperCase(),
    facilidade: item.agregado.indice_facilidade,
    completude: item.agregado.indice_completude,
    transparencia: item.agregado.indice_transparencia,
  }));

  useEffect(() => {
    const linePlot = Plot.plot({
      grid: true,
      width: 1000,
      height: !isMobile ? height : mobileHeight,
      marginLeft: !isMobile ? 55 : 110,
      y: {
        label: '',
      },
      x: {
        label: !isMobile ? 'PONTUAÇÃO' : '',
        domain: [0, 1],
        tickFormat: d => `${d}`.replace('.', ','),
        labelOffset: 29,
      },
      style: {
        color: '#3e5363',
        background: '#f5f5f5',
        fontSize: !isMobile ? '14px' : '30px',
        fontWeight: 'bold',
        fontFamily: 'Roboto Condensed, sans-serif',
      },
      marks: [
        Plot.link(data, {
          x1: 'facilidade',
          x2: 'completude',
          y: 'nome',
        }),
        Plot.dot(data, {
          title: d => `${d.completude.toFixed(2)}`.replace('.', ','),
          x: 'completude',
          y: 'nome',
          r: !isMobile ? 6 : 14,
          fill: '#f2ca4b',
          stroke: '#3e5363',
          strokeWidth: 1,
        }),
        Plot.dot(data, {
          title: d => `${d.facilidade.toFixed(2)}`.replace('.', ','),
          x: 'facilidade',
          y: 'nome',
          r: !isMobile ? 6 : 14,
          fill: '#7f3d8b',
          stroke: '#3e5363',
          strokeWidth: 1,
        }),
        Plot.dot(data, {
          x: 'transparencia',
          y: 'nome',
          r: 1.5,
          fill: 'black',
        }),
        Plot.dot(data, {
          title: d => `${d.transparencia.toFixed(2)}`.replace('.', ','),
          x: 'transparencia',
          y: 'nome',
          r: !isMobile ? 10 : 20,
          fill: '#3edbb1',
          opacity: 0.65,
          sort: { y: 'x', reverse: true },
        }),
      ],
    });

    ref.current.append(linePlot);

    return () => linePlot.remove();
  }, [data]);

  return (
    <Box>
      <IndexChartLegend />
      <Graph ref={ref} />
    </Box>
  );
}
const Graph = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;
