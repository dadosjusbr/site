import { Close, Done } from '@mui/icons-material';
import { Box, ListItemIcon, Typography } from '@mui/material';

export function HandleAccess({ text }: { text: string }) {
  switch (text) {
    case 'ACESSO_DIRETO':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="success" />
          </ListItemIcon>
          <Typography variant="subtitle2">Acesso direto</Typography>
        </Box>
      );
    case 'AMIGAVEL_PARA_RASPAGEM':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <Typography variant="subtitle2">Amigável para raspagem</Typography>
        </Box>
      );
    case 'RASPAGEM_DIFICULTADA':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <Typography variant="subtitle2">Raspagem dificultada</Typography>
        </Box>
      );
    case 'NECESSITA_SIMULACAO_USUARIO':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <Typography variant="subtitle2">
            É possível navegar no html do site
          </Typography>
        </Box>
      );
    default:
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Close color="error" />
          </ListItemIcon>
          <Typography variant="subtitle2">--</Typography>
        </Box>
      );
  }
}

export function HandleDataTypes({
  text,
  type,
}: {
  text: string;
  type: string;
}) {
  switch (type) {
    case 'SUMARIZADO':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <Typography variant="subtitle2">
            Disponibiliza dados de {text} sumarizados
          </Typography>
        </Box>
      );
    case 'DETALHADO':
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="success" />
          </ListItemIcon>
          <Typography variant="subtitle2">
            Disponibiliza dados de {text} detalhados
          </Typography>
        </Box>
      );
    default:
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Close color="error" />
          </ListItemIcon>
          <Typography variant="subtitle2">
            Não disponibiliza dados de {text}
          </Typography>
        </Box>
      );
  }
}
