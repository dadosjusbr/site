import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../../styles/theme-light';

interface Column {
  id: 'coluna' | 'tipo' | 'descricao' | 'exemplo';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'coluna', label: 'Coluna', minWidth: 80 },
  {
    id: 'tipo',
    label: 'Tipo',
    minWidth: 80,
    format: value => value.toLocaleString('pt-BR'),
  },
  {
    id: 'descricao',
    label: 'Descrição',
    minWidth: 80,
    format: (value: number) => value.toLocaleString('pt-BR'),
  },
  {
    id: 'exemplo',
    label: 'Exemplo',
    minWidth: 160,
  },
];

interface Data {
  coluna: string;
  tipo: string;
  descricao: string;
  exemplo: string;
}

function createData(
  coluna: string,
  tipo: string,
  descricao: string,
  exemplo: string,
): Data {
  return {
    coluna,
    tipo,
    descricao,
    exemplo,
  };
}

const rows = [
  createData('orgao', 'string', 'Sigla do órgão', 'TJMSP'),
  createData('mes', 'int', 'Mês de referência do contracheque', '1'),
  createData('ano', 'int', 'Ano de referência do contracheque', '2024'),
  createData(
    'matricula',
    'string',
    'Indentificador do membro em cada órgão',
    '0021432',
  ),
  createData('nome', 'string', 'Nome do membro', 'José da Silva'),
  createData(
    'cargo',
    'string',
    'O cargo desempenhado pelo membro',
    'Juiz do Tribunal de Justiça Militar',
  ),
  createData(
    'lotacao',
    'string',
    'Local de lotação do membro',
    'Auditoria da Justiça Militar Estadual',
  ),
  createData(
    'categoria_contracheque',
    'string',
    'Categoria do contracheque',
    'Descontos',
  ),
  createData(
    'detalhamento_contracheque',
    'string',
    'Rubrica associada ao contracheque',
    'Imposto de renda',
  ),
  createData('valor', 'float', 'Valor da remuneração', '-10516,40'),
];

export default function DataDictionary() {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4}>
        <TableContainer
          sx={{
            border: '1px solid #9b9b9b',
            borderRadius: '4px',
            maxHeight: 300,
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#555',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#888',
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Typography fontWeight="bold" variant="subtitle2">
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow role="checkbox" tabIndex={-1} key={row.coluna}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Typography variant="subtitle2">
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </ThemeProvider>
  );
}
