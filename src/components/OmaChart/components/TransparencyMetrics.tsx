import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Close, Done } from '@mui/icons-material';
import MONTHS from '../../../@types/MONTHS';
import { HandleAccess, HandleDataTypes } from './HandleMetadata';

const index = ({
  mi,
  month,
  year,
}: {
  mi: SummaryzedMI;
  month: number;
  year: number;
}) => (
  <Grid item xs={12}>
    <Paper elevation={0}>
      <Box p={2}>
        <Typography variant="h6" textAlign="center">
          Índice de transparência:{' '}
          <b>
            {mi.indice_transparencia.indice_transparencia === undefined
              ? 'Indisponível'
              : mi.indice_transparencia.indice_transparencia.toFixed(2)}
          </b>
          <Tooltip
            placement="top"
            sx={{ mb: 0.5 }}
            title={
              <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
                <b>Índice de transparência:</b> Média harmônica entre os índices
                de completude e facilidade em {MONTHS[month]} de {year}.
                <hr />
                <b>Índice de completude:</b> Pontua a completude dos dados
                segundo os critérios listados.
                <hr />
                <b>Índice de facilidade:</b> Pontua a facilidade de obtenção e
                uso dos dados segundo os critérios listados.
              </Typography>
            }
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem>
                <ListItemText
                  primary={`Índice de completude: ${
                    mi.indice_transparencia.indice_completude === undefined
                      ? 'Indisponível'
                      : mi.indice_transparencia.indice_completude.toFixed(2)
                  }`}
                  primaryTypographyProps={{
                    variant: 'h6',
                  }}
                />
              </ListItem>
              <ListItem>
                {mi.metadados.tem_lotacao == null ||
                mi.metadados.tem_lotacao === false ? (
                  <ListItemIcon>
                    <Close color="error" />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <Done color="success" />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="Tem lotação"
                  sx={{
                    textDecoration: mi.metadados.tem_lotacao
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
              <ListItem>
                {mi.metadados.tem_cargo == null ||
                mi.metadados.tem_cargo === false ? (
                  <ListItemIcon>
                    <Close color="error" />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <Done color="success" />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="Tem cargo"
                  sx={{
                    textDecoration: mi.metadados.tem_cargo
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
              <ListItem>
                {mi.metadados.tem_matricula == null ||
                mi.metadados.tem_matricula === false ? (
                  <ListItemIcon>
                    <Close color="error" />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <Done color="success" />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="Tem matrícula e nome"
                  sx={{
                    textDecoration: mi.metadados.tem_matricula
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <HandleDataTypes
                      type={mi.metadados.remuneracao_basica}
                      text="remuneração básica"
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <HandleDataTypes
                      type={mi.metadados.despesas}
                      text="descontos"
                    />
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <HandleDataTypes
                      type={mi.metadados.outras_receitas}
                      text="outras receitas"
                    />
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem>
                <ListItemText
                  primary={`Índice de facilidade: ${
                    mi.indice_transparencia.indice_facilidade === undefined
                      ? 'Indisponível'
                      : mi.indice_transparencia.indice_facilidade.toFixed(2)
                  }`}
                  primaryTypographyProps={{
                    variant: 'h6',
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<HandleAccess text={mi.metadados.acesso} />}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {mi.metadados.manteve_consistencia_no_formato == null ||
                  mi.metadados.manteve_consistencia_no_formato === false ? (
                    <Close color="error" />
                  ) : (
                    <Done color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Manteve consistência no formato"
                  sx={{
                    textDecoration: mi.metadados.manteve_consistencia_no_formato
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {mi.metadados.dados_estritamente_tabulares == null ||
                  mi.metadados.dados_estritamente_tabulares === false ? (
                    <Close color="error" />
                  ) : (
                    <Done color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Dados estritamente tabulares"
                  sx={{
                    textDecoration: mi.metadados.dados_estritamente_tabulares
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
              <ListItem>
                {mi.metadados.formato_aberto == null ||
                mi.metadados.formato_aberto === false ? (
                  <ListItemIcon>
                    <Close color="error" />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <Done color="success" />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="Possui formato aberto"
                  sx={{
                    textDecoration: mi.metadados.formato_aberto
                      ? null
                      : 'line-through',
                  }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Grid>
);

export default index;
