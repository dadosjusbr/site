import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { formatAgency } from '../../../functions/format';
import styled from 'styled-components';
import { isAfter, format, addMonths } from 'date-fns';

const StatusCards = ({ ais }) => {
  let collectStartDate = new Date('2022-09');
  const currentDate = new Date();
  const collects = [];

  const collecting = ais
    .filter(ag => ag.coletando === undefined)
    .sort((a, b) => {
      if (a.uf > b.uf) {
        return 1;
      }
      if (a.uf < b.uf) {
        return -1;
      }
      return 0;
    });

  const notCollecting = ais
    .filter(ag => ag.coletando !== undefined)
    .sort((a, b) => {
      if (a.uf > b.uf) {
        return 1;
      }
      if (a.uf < b.uf) {
        return -1;
      }
      return 0;
    });

  while (isAfter(currentDate, collectStartDate)) {
    collects.push(format(collectStartDate, 'yyyy-MM'));
    collectStartDate = addMonths(collectStartDate, 1);
  }

  const getReasons = ag => {
    if (ag.coletando && ag.coletando.length > 0 && ag.coletando[0].descricao) {
      return ag.coletando[0].descricao.map(desc => `${desc}. `);
    }
    return '';
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={2}
      flexDirection="row"
    >
      <Paper
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Órgãos monitorados pelo DadosJusBR: {collecting.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '15vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey',
              },
            }}
          >
            {collecting.map(ag => (
              <ListItem key={ag.id_orgao}>
                <ListItemIcon>
                  <Upper>{formatAgency(ag.id_orgao)}</Upper>
                </ListItemIcon>
                <ListItemText>{ag.nome}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Órgãos NÃO monitorados pelo DadosJusBR: {notCollecting.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '15vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey',
              },
            }}
          >
            {notCollecting.map(ag => (
              <ListItem key={ag.id_orgao}>
                <ListItemIcon>
                  <Upper>{formatAgency(ag.id_orgao)}</Upper>
                </ListItemIcon>
                <ListItemText secondary={getReasons(ag)}>
                  {ag.nome}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Coletas documentadas: {collects.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '17.8vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em',
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey',
              },
            }}
          >
            {collects.reverse().map(ag => (
              <ListItem key={ag}>
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      cursor: 'pointer',
                      fontSize: '1rem',
                    },
                  }}
                  onClick={() => {
                    window.open(
                      `https://github.com/dadosjusbr/site/wiki/Coleta-${new Date(
                        ag,
                      )
                        .toLocaleDateString('pt-BR', {
                          month: 'short',
                          year: 'numeric',
                        })
                        .replace('. de', '')
                        .replace(' ', '-')
                        .replace(/^\w/, c => c.toUpperCase())}`,
                      '_blank',
                    );
                  }}
                >
                  {new Date(ag)
                    .toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    })
                    .replace(/^\w/, c => c.toUpperCase())}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default StatusCards;

const Upper = styled.span`
  text-transform: uppercase;
`;
