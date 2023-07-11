import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import InfoIcon from '@mui/icons-material/Info';
import { formatLink } from '../functions';

const index = ({ mi, agency }: { mi: SummaryzedMI; agency: string }) => (
  <Grid item xs={12}>
    <Accordion
      sx={{
        minWidth: 230,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" variant="h6">
          Mais informações sobre a coleta
          <Tooltip
            placement="top"
            sx={{ mb: 0.5 }}
            title={
              <Typography fontSize={{ xs: '0.8rem', md: '0.9rem' }}>
                <b>Repositório do Coletor:</b> Link para o repositório de código
                aberto utilizado para a realização da coleta de dados do
                respectivo órgão - baixando os dados diretamente, realizando a
                raspagem do HTML ou ainda simulando um usuário.
                <hr />
                <b>Repositório para Tratamento dos Dados:</b> Link para o
                repositório de código aberto utilizado para o tratamento dos
                dados obtidos pelo coletor - organizando, detalhando e
                unificando esses dados. Alguns órgãos recebem o tratamento de
                dados ainda no coletor, não possuindo esse estágio.
                <hr />
                <b>Duração da Coleta:</b> Tempo total do processo de coleta -
                considerando a coleta, o tratamento, a validação, o
                empacotamento e o armazenamento desses dados.
              </Typography>
            }
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container>
            <Grid item xs={12} md={6}>
              <List dense>
                {mi.dados_coleta.repositorio_coletor !== undefined ? (
                  <ListItem
                    button
                    component="a"
                    target="_blank"
                    href={formatLink({
                      version: mi.dados_coleta.versao_coletor,
                      repository: mi.dados_coleta.repositorio_coletor,
                      agency,
                    })}
                  >
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Repositório do Coletor" />
                  </ListItem>
                ) : (
                  ''
                )}
                <ListItem>
                  <ListItemIcon>
                    <AlarmOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Duração da Coleta: ${
                      mi.dados_coleta.duracao_segundos === undefined
                        ? 'Indisponível'
                        : new Date(mi.dados_coleta.duracao_segundos * 1000)
                            .toISOString()
                            .slice(11, 19)
                    }`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense>
                {mi.dados_coleta.repositorio_parser !== undefined ? (
                  <ListItem
                    button
                    component="a"
                    target="_blank"
                    href={formatLink({
                      version: mi.dados_coleta.versao_parser,
                      repository: mi.dados_coleta.repositorio_parser,
                      agency,
                    })}
                  >
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Repositório para Tratamento dos Dados" />
                  </ListItem>
                ) : (
                  ''
                )}
              </List>
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  </Grid>
);

export default index;
