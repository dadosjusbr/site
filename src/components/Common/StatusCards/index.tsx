import styled from 'styled-components';
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

const StatusCards = ({ ais }) => {
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
        elevation={3}
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Órgãos monitorados pelo DadosJusBr: {collecting.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '35vh',
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
        elevation={3}
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Órgãos dependentes da coleta manual do DadosJusBr:{' '}
            {collecting.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '35vh',
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
        elevation={3}
        sx={{
          height: 'fit-content',
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <Box p={2}>
          <Typography variant="h3" gutterBottom>
            Órgãos NÃO monitorados pelo DadosJusBr: {notCollecting.length}
          </Typography>
          <List
            dense
            disablePadding
            sx={{
              maxHeight: '35vh',
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
    </Box>
  );
};

export default StatusCards;

const Upper = styled.span`
  text-transform: uppercase;
`;
