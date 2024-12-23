import { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  styled as muiStyled,
  ListProps,
} from '@mui/material';
import { formatAgency } from '../../../functions/format';
import api from '../../../services/api';

const latestData = (allAgencyInfo: AllAgencyInformation) =>
  allAgencyInfo?.coletas.reduce((latest, current) => {
    if (
      current.ano > latest.ano ||
      (current.ano === latest.ano && current.mes > latest.mes)
    ) {
      return current;
    }
    return latest;
  }, allAgencyInfo.coletas[0]);

const StatusCards = ({ ais }) => {
  const [loading, setLoading] = useState(true);
  const [manualCollection, setManualCollection] = useState([]);
  const [notCollecting, setNotCollecting] = useState([]);

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

  const badDataAg = ais
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

  const getManualColletion = async () => {
    const results = await Promise.all(
      badDataAg.map(async ag => {
        try {
          const { data: response } = await api.default.get(
            `/dados/${ag.id_orgao}`,
          );

          const { coleta_manual } = latestData(response);

          return { ...ag, coleta_manual };
        } catch (error) {
          return { ...ag, error: 'Failed to fetch data' };
        }
      }),
    );

    setLoading(false);
    return results;
  };

  useEffect(() => {
    const t = getManualColletion();
    t.then(res => {
      setManualCollection(res.filter(ag => ag.coleta_manual));
      setNotCollecting(res.filter(ag => !ag.coleta_manual));
    });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      gap={2}
      flexDirection={{ xs: 'column', md: 'row' }}
      mt={{ xs: 4, sm: 14, md: 0 }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper
            elevation={3}
            sx={{
              height: 'fit-content',
              width: '100%',
              borderRadius: '16px',
            }}
          >
            <Box p={2}>
              <Typography variant="h3">
                Órgãos com coleta automatizada: {collecting.length}
              </Typography>
              <Typography variant="subtitle2" mb={2}>
                A obtenção dos contracheques ocorre mensalmente por meio de
                robôs.
              </Typography>
              <ScrollbarList dense disablePadding>
                {collecting.map(ag => (
                  <ListItem key={ag.id_orgao}>
                    <ListItemIcon>
                      <Upper>{formatAgency(ag.id_orgao)}</Upper>
                    </ListItemIcon>
                    <ListItemText>{ag.nome}</ListItemText>
                  </ListItem>
                ))}
              </ScrollbarList>
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
              <Typography variant="h3">
                Órgãos com coleta manual: {manualCollection.length}
              </Typography>
              <Typography variant="subtitle2" mb={2}>
                Portais não possibilitam o monitoramento automático, dados são
                obtidos manualmente a cada seis meses.
              </Typography>
              <ScrollbarList dense disablePadding>
                {manualCollection.map(ag => (
                  <ListItem key={ag.id_orgao}>
                    <ListItemIcon>
                      <Upper>{formatAgency(ag.id_orgao)}</Upper>
                    </ListItemIcon>
                    <ListItemText secondary={getReasons(ag)}>
                      {ag.nome}
                    </ListItemText>
                  </ListItem>
                ))}
              </ScrollbarList>
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
              <Typography variant="h3">
                Órgãos atualmente sem coleta: {notCollecting.length}
              </Typography>
              <Typography variant="subtitle2" mb={2}>
                Estrutura dos dados não permite a individualização de
                contracheques &#40;como ocultação de nomes e matrículas&#41;.
              </Typography>
              <ScrollbarList dense disablePadding>
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
              </ScrollbarList>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default StatusCards;

const ScrollbarList = muiStyled(
  forwardRef((props: ListProps, ref: React.Ref<HTMLOListElement>) => (
    <List {...props} ref={ref} />
  )),
)(({ theme }) => ({
  maxHeight: '30.5vh',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '16px',
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[200],
    outline: '1px solid slategrey',
    borderRadius: '16px',
  },
}));

const Upper = styled.span`
  text-transform: uppercase;
`;
