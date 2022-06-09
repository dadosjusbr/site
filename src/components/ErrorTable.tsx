import React from 'react';

import { Box, Paper, Button, Stack, ThemeProvider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import MONTHS from '../@types/MONTHS';
import light from '../styles/theme-light';

const ErrorTable: React.FC<{
  agency: string;
  month: number;
  year: number;
}> = ({ agency, month, year }) => (
  <>
    <ThemeProvider theme={light}>
      <Box m={4}>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-end"
          mt={2}
          mb={4}
        >
          <Button
            variant="outlined"
            color="info"
            startIcon={<ArrowBackIcon />}
            href={`/orgao/${agency}/${year}`}
          >
            Voltar para explorar por ano
          </Button>
        </Stack>
        <Paper elevation={0}>
          <Box p={4}>
            Não temos dados para o <strong>{agency.toUpperCase()}</strong> em{' '}
            {MONTHS[month]} de {year}.
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  </>
);

export default ErrorTable;
