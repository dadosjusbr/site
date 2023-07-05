import { useRef, useEffect } from 'react';
import * as Plot from '@observablehq/plot';
import { Box, useMediaQuery } from '@mui/material';
import { formatAgency } from '../../functions/format';
import IndexChartLegend from '../IndexChartLegend';

export default function IndexTabGraph({
  plotData,
  height = 700,
  mobileHeight = 1400,
  isAgency = false,
}: {
  plotData: AggregateIndexes[];
  height?: number;
  mobileHeight?: number;
  isAgency?: boolean;
}) {
  const ref = useRef(null);
  const isMobile = useMediaQuery('(max-width: 900px)');

  let data = null;

  if (isAgency) {
    data = plotData?.map((item: AggregateIndexes) => ({
      nome: item.id_orgao,
      facilidade: item.agregado.indice_facilidade,
      completude: item.agregado.indice_completude,
      transparencia: item.agregado.indice_transparencia,
    }));
  } else {
    data = plotData?.map((item: AggregateIndexes) => ({
      nome: formatAgency(item.id_orgao).toUpperCase(),
      facilidade: item.agregado.indice_facilidade,
      completude: item.agregado.indice_completude,
      transparencia: item.agregado.indice_transparencia,
    }));
  }

  useEffect(() => {
    let linePlot = null;

    if (isAgency) {
      linePlot = Plot.plot({
        grid: true,
        width: 1000,
        height: !isMobile ? height : mobileHeight,
        marginLeft: !isMobile ? 55 : 90,
        marginBottom: !isMobile ? 45 : 50,
        x: {
          label: 'Anos',
          tickFormat: d => `${d}`.replace(',', ''),
          labelAnchor: 'center',
          labelOffset: !isMobile ? 42 : 48,
          inset: 12,
          interval: 1,
        },
        y: {
          label: 'Pontuação',
          domain: [0, 1],
          tickFormat: d => `${d}`.replace('.', ','),
          axis: 'left',
          labelAnchor: 'center',
          inset: 10,
        },
        style: {
          color: '#3e5363',
          background: '#f5f5f5',
          fontSize: !isMobile ? '14px' : '28px',
          fontWeight: 'bold',
          fontFamily: 'Roboto Condensed, sans-serif',
        },
        marks: [
          Plot.link(data, {
            x: 'nome',
            y2: 'completude',
            y1: 'facilidade',
          }),
          Plot.dot(data, {
            title: d => `${d.completude.toFixed(2)}`.replace('.', ','),
            y: 'completude',
            x: 'nome',
            r: !isMobile ? 6 : 14,
            fill: '#f2ca4b',
            stroke: '#3e5363',
            strokeWidth: 1,
          }),
          Plot.dot(data, {
            title: d => `${d.facilidade.toFixed(2)}`.replace('.', ','),
            y: 'facilidade',
            x: 'nome',
            r: !isMobile ? 6 : 14,
            fill: '#7f3d8b',
            stroke: '#3e5363',
            strokeWidth: 1,
          }),
          Plot.dot(data, {
            y: 'transparencia',
            x: 'nome',
            r: 1.5,
            fill: 'black',
          }),
          Plot.dot(data, {
            title: d => `${d.transparencia.toFixed(2)}`.replace('.', ','),
            y: 'transparencia',
            x: 'nome',
            r: !isMobile ? 10 : 20,
            fill: '#3edbb1',
            opacity: 0.65,
            sort: { y: 'x', reverse: true },
          }),
        ],
      });
    } else {
      linePlot = Plot.plot({
        grid: true,
        width: 1000,
        height: !isMobile ? height : mobileHeight,
        marginLeft: !isMobile ? 65 : 110,
        marginBottom: !isMobile ? 45 : 65,
        y: {
          label: '',
          tickFormat: d => `${d}`.replace(',', ''),
        },
        x: {
          label: 'PONTUAÇÃO',
          domain: [0, 1],
          tickFormat: d => `${d}`.replace('.', ','),
          labelOffset: !isMobile ? 40 : 62,
          tickPadding: 3,
        },
        style: {
          color: '#3e5363',
          background: '#f5f5f5',
          fontSize: !isMobile ? '16px' : '30px',
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
    }

    ref.current.append(linePlot);

    return () => linePlot.remove();
  }, [data]);

  return (
    <>
      <IndexChartLegend />
      <Box
        ref={ref}
        sx={{
          svg: {
            width: '100%',
            height: '100%',
          },
        }}
      />
    </>
  );
}
