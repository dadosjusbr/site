import { useRef, useEffect } from 'react';
import * as Plot from '@observablehq/plot';
import styled from 'styled-components';

export default function IndexTabGraph() {
  const ref = useRef(null);
  const data = [
    {
      nome: 'TJSC',
      transparencia: 0.6,
      completude: 0.59,
      facilidade: 0.61,
    },
    {
      nome: 'TJSP',
      transparencia: 0.3,
      completude: 0.2,
      facilidade: 0.4,
    },
    {
      nome: 'TJMG',
      transparencia: 0.8,
      completude: 0.7,
      facilidade: 0.9,
    },
    {
      nome: 'TJRS',
      transparencia: 0.1,
      completude: 0,
      facilidade: 0.2,
    },
    {
      nome: 'TJPR',
      transparencia: 0.7,
      completude: 0.7,
      facilidade: 0.75,
    },
    {
      nome: 'TJMT',
      transparencia: 0.5,
      completude: 0.5,
      facilidade: 0.6,
    },
    {
      nome: 'TJGO',
      transparencia: 0.4,
      completude: 0.4,
      facilidade: 0.5,
    },
    {
      nome: 'TJBA',
      transparencia: 0.2,
      completude: 0.1,
      facilidade: 0.3,
    },
    {
      nome: 'TJPE',
      transparencia: 0.9,
      completude: 0.8,
      facilidade: 0.95,
    },
    {
      nome: 'TJCE',
      transparencia: 0.3,
      completude: 0.2,
      facilidade: 0.4,
    },
    {
      nome: 'TJRN',
      transparencia: 0.6,
      completude: 0.5,
      facilidade: 0.7,
    },
    {
      nome: 'TJMA',
      transparencia: 0.8,
      completude: 0.7,
      facilidade: 0.9,
    },
    {
      nome: 'TJAL',
      transparencia: 0.1,
      completude: 0,
      facilidade: 0.2,
    },
    {
      nome: 'TJPI',
      transparencia: 0.7,
      completude: 0.6,
      facilidade: 0.75,
    },
    {
      nome: 'TJDFT',
      transparente: 0.5,
      completude: 0.5,
      facilidade: 0.6,
    },
  ];

  useEffect(() => {
    const barChart = Plot.plot({
      grid: true,
      width: 1000,
      height: 600,
      margin: 55,
      y: {
        label: '',
      },
      x: {
        label: 'PONTUAÇÃO',
        domain: [0, 1],
      },
      style: {
        color: '#3e5363',
        background: '#f5f5f5',
        fontSize: '14px',
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
          x: 'completude',
          y: 'nome',
          r: 6,
          fill: '#f2ca4b',
          stroke: '#3e5363',
          strokeWidth: 1,
        }),
        Plot.dot(data, {
          x: 'facilidade',
          y: 'nome',
          r: 6,
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
          x: 'transparencia',
          y: 'nome',
          r: 9,
          fill: '#3edbb1',
          opacity: 0.65,
        }),
      ],
    });

    ref.current.append(barChart);

    return () => barChart.remove();
  }, []);

  return <Div ref={ref} />;
}

const Div = styled.div`
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
