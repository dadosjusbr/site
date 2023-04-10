import { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import HistoryIcon from '@mui/icons-material/History';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InfoIcon from '@mui/icons-material/Info';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Done, Close } from '@mui/icons-material';

import * as url from '../url';
import ShareModal from './ShareModal';
import MONTHS from '../@types/MONTHS';
import light from '../styles/theme-light';
import Drawer from './Drawer';

export interface OMASummaryProps {
  totalMembers: number;
  maxWage: number;
  totalWage: number;
  maxPerk: number;
  totalPerks: number;
  chartData: any;
  mi: any;
  year: number;
  month: number;
  agency: string;
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ShowAcesso(props) {
  const { children: acesso } = props;
  switch (acesso) {
    case 'ACESSO_DIRETO':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="success" />
          </ListItemIcon>
          <span>Acesso direto</span>
        </div>
      );
      break;
    case 'AMIGAVEL_PARA_RASPAGEM':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <span>Amigável para raspagem</span>
        </div>
      );
      break;
    case 'RASPAGEM_DIFICULTADA':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <span>Raspagem dificultada</span>
        </div>
      );
      break;
    case 'NECESSITA_SIMULACAO_USUARIO':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <span>É possível navegar no html do site</span>
        </div>
      );
      break;
    default:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Close color="error" />
          </ListItemIcon>
          <span>--</span>
        </div>
      );
      break;
  }
}
function ShowTipoDado(props) {
  const { children: texto } = props;
  const { tipo } = props;
  switch (tipo) {
    case 'SUMARIZADO':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="warning" />
          </ListItemIcon>
          <span>Disponibiliza dados de {texto} sumarizados</span>
        </div>
      );
      break;
    case 'DETALHADO':
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Done color="success" />
          </ListItemIcon>
          <span>Disponibiliza dados de {texto} detalhados</span>
        </div>
      );
      break;
    default:
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ListItemIcon>
            <Close color="error" />
          </ListItemIcon>
          <span> Não disponibiliza dados de {texto} </span>
        </div>
      );
      break;
  }
}

const OMASummary: React.FC<OMASummaryProps> = ({
  totalMembers,
  maxWage,
  totalWage,
  maxPerk,
  totalPerks,
  chartData,
  mi,
  year,
  month,
  agency,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileLink = `${process.env.S3_REPO_URL}/${agency}/datapackage/${agency}-${year}-${month}.zip`;
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / 1024 ** i).toFixed(dm))} ${sizes[i]}`;
  }

  function StackButton() {
    return (
      <ButtonBox>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          mt={2}
          mb={4}
        >
          <Button
            variant="outlined"
            color="info"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              router.back();
            }}
          >
            VOLTAR
          </Button>
        </Stack>
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
            endIcon={<IosShareIcon />}
            onClick={() => setModalIsOpen(true)}
          >
            COMPARTILHAR
          </Button>
          <Button
            variant="outlined"
            color="info"
            endIcon={<CloudDownloadIcon />}
            onClick={() => {
              ReactGA.pageview(url.downloadURL(fileLink));
            }}
            href={url.downloadURL(fileLink)}
          >
            BAIXAR{' '}
            <GreenColor>{formatBytes(mi.pacote_de_dados.size)}</GreenColor>
          </Button>
          <Button
            variant="outlined"
            color="info"
            endIcon={<SearchIcon />}
            onClick={() => {
              router.push(
                `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
              );
            }}
          >
            PESQUISAR
          </Button>
        </Stack>
      </ButtonBox>
    );
  }

  function formatLink(version: string, repository: string): string {
    // Caso tenhamos a versão, o link redirecionará para o repositório na versão utilizada.
    // Caso contrário, retornará o link do próprio repositório (versão atual).
    // Tbm verificamos se a versão refere-se ao id de um container ou commit.
    if (version !== undefined && version !== 'unspecified') {
      if (version.includes('sha256')) {
        const p = repository.includes('coletor') ? 'coletor' : 'parser';
        const ag = repository.includes('cnj') ? 'cnj' : agency;

        return `${repository}/pkgs/container/${p}-${ag}/${version}`;
      }

      return `${repository}/tree/${version}`;
    }

    return `${repository}`;
  }

  return (
    <>
      {!matches ? (
        <StackButton />
      ) : (
        <Drawer>
          <Stack spacing={2} direction="column" mt={3} mx={6}>
            <Button
              variant="outlined"
              color="info"
              endIcon={<IosShareIcon />}
              onClick={() => setModalIsOpen(true)}
            >
              COMPARTILHAR
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<CloudDownloadIcon />}
              onClick={() => {
                ReactGA.pageview(url.downloadURL(fileLink));
              }}
              href={url.downloadURL(fileLink)}
            >
              BAIXAR{' '}
              <GreenColor>{formatBytes(mi.pacote_de_dados.size)}</GreenColor>
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<SearchIcon />}
              onClick={() => {
                router.push(
                  `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
                );
              }}
            >
              PESQUISAR
            </Button>
          </Stack>
        </Drawer>
      )}
      <ThemeProvider theme={light}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={20}>
            <Paper elevation={0}>
              <Div>
                <Typography pt={2} px={2} variant="h6">
                  Resumo de remunerações de membros ativos
                </Typography>
              </Div>
              <Box p={2} pb={4}>
                <Grid xs={12} md={20}>
                  <List
                    dense
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Grid item {...(matches && { width: '100%' })}>
                      <ListItem sx={{ paddingTop: 1 }}>
                        <ListItemAvatar>
                          <Avatar>
                            <EmojiPeopleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Quantidade de membros: ${totalMembers}`}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item {...(matches && { width: '100%' })}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AccountBalanceWalletIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Maior salário: R$ ${(
                            maxWage / 1000
                          ).toFixed(2)} mil`}
                          secondary={`Total de salários: R$ ${(
                            totalWage / 100000
                          ).toFixed(2)}M`}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item {...(matches && { width: '100%' })}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CardGiftcardIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Maior benefício: R$ ${(
                            maxPerk / 1000
                          ).toFixed(2)} mil`}
                          secondary={`Total de benefícios: R$ ${(
                            totalPerks / 1000000
                          ).toFixed(2)}M`}
                        />
                      </ListItem>
                    </Grid>
                  </List>
                </Grid>
              </Box>
            </Paper>
          </Grid>

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
                      <Typography fontSize="0.8rem">
                        <p>
                          <b>Índice de transparência:</b> Média harmônica entre
                          os índices de completude e facilidade em{' '}
                          {MONTHS[month]} de {year}
                        </p>
                        <p>
                          <b>Índice de completude:</b> Pontua a completude dos
                          dados segundo os critérios listados
                        </p>
                        <p>
                          <b>Índice de facilidade:</b> Pontua a facilidade de
                          obtenção e uso dos dados segundo os critérios listados
                        </p>
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
                            mi.indice_transparencia.indice_completude ===
                            undefined
                              ? 'Indisponível'
                              : mi.indice_transparencia.indice_completude.toFixed(
                                  2,
                                )
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
                            <ShowTipoDado
                              tipo={mi.metadados.remuneracao_basica}
                            >
                              remuneração básica
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.metadados.despesas}>
                              descontos
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.metadados.outras_receitas}>
                              outras receitas
                            </ShowTipoDado>
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
                            mi.indice_transparencia.indice_facilidade ===
                            undefined
                              ? 'Indisponível'
                              : mi.indice_transparencia.indice_facilidade.toFixed(
                                  2,
                                )
                          }`}
                          primaryTypographyProps={{
                            variant: 'h6',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowAcesso>{mi.metadados.acesso}</ShowAcesso>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {mi.metadados.manteve_consistencia_no_formato ==
                            null ||
                          mi.metadados.manteve_consistencia_no_formato ===
                            false ? (
                            <Close color="error" />
                          ) : (
                            <Done color="success" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary="Manteve consistência no formato"
                          sx={{
                            textDecoration: mi.metadados
                              .manteve_consistencia_no_formato
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {mi.metadados.dados_estritamente_tabulares == null ||
                          mi.metadados.dados_estritamente_tabulares ===
                            false ? (
                            <Close color="error" />
                          ) : (
                            <Done color="success" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary="Dados estritamente tabulares"
                          sx={{
                            textDecoration: mi.metadados
                              .dados_estritamente_tabulares
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
          <Grid item xs={12}>
            <Paper elevation={0}>
              <Box pt={4} py={4} px={2}>
                <Typography variant="h6" textAlign="center">
                  Distribuição de remunerações de membros ativos
                </Typography>
                <Box px={2}>
                  {!chartData.histograma ? (
                    <ActivityIndicatorPlaceholder fontColor="#3e5363">
                      <span>Não há dados de membros para esse mês</span>
                    </ActivityIndicatorPlaceholder>
                  ) : (
                    <Chart
                      options={{
                        legend: {
                          show: false,
                        },
                        colors: ['#c9a0d0', '#513658'],
                        chart: {
                          stacked: true,
                          toolbar: {
                            show: false,
                          },
                          zoom: {
                            enabled: true,
                          },
                        },
                        responsive: [
                          {
                            breakpoint: 500,
                            options: {
                              chart: {
                                width: '95%',
                              },
                            },
                          },
                        ],
                        plotOptions: {
                          bar: {
                            horizontal: true,
                            barHeight: '70%',
                          },
                        },
                        yaxis: {
                          decimalsInFloat: 2,
                          labels: {
                            show: true,
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                              colors: [],
                              fontSize: '14px',
                              fontFamily: 'Roboto Condensed, sans-serif',
                              fontWeight: 600,
                              cssClass: 'apexcharts-yaxis-label',
                            },
                          },
                        },
                        xaxis: {
                          categories: [
                            '> R$ 50 mil',
                            'R$ 40-50 mil',
                            'R$ 30-40 mil',
                            'R$ 20-30 mil',
                            'R$ 10-20 mil',
                            '< R$ 10 mil',
                          ],
                          title: {
                            text: 'Quantidade',
                            offsetY: 30,
                          },
                        },
                        fill: {
                          opacity: 1,
                        },
                        dataLabels: {
                          enabled: false,
                        },
                      }}
                      series={[
                        {
                          name: 'Membros',
                          data: [
                            chartData.histograma['-1'],
                            chartData.histograma['50000'],
                            chartData.histograma['40000'],
                            chartData.histograma['30000'],
                            chartData.histograma['20000'],
                            chartData.histograma['10000'],
                          ],
                        },
                      ]}
                      width="100%"
                      height="500"
                      type="bar"
                    />
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
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
                      <Typography fontSize="0.8rem">
                        <p>
                          <b>Repositório do Coletor:</b> Link para o repositório
                          de código aberto utilizado para a realização da coleta
                          de dados do respectivo órgão - baixando os dados
                          diretamente, realizando a raspagem do HTML ou ainda
                          simulando um usuário.
                        </p>
                        <p>
                          <b>Repositório para Tratamento dos Dados:</b> Link
                          para o repositório de código aberto utilizado para o
                          tratamento dos dados obtidos pelo coletor -
                          organizando, detalhando e unificando esses dados.
                          Alguns órgãos recebem o tratamento de dados ainda no
                          coletor, não possuindo esse estágio.
                        </p>
                        <p>
                          <b>Duração da Coleta:</b> Tempo total do processo de
                          coleta - considerando a coleta, o tratamento, a
                          validação, o empacotamento e o armazenamento desses
                          dados.
                        </p>
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
                            href={formatLink(
                              mi.dados_coleta.versao_coletor,
                              mi.dados_coleta.repositorio_coletor,
                            )}
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
                                : new Date(
                                    mi.dados_coleta.duracao_segundos * 1000,
                                  )
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
                            href={formatLink(
                              mi.dados_coleta.versao_parser,
                              mi.dados_coleta.repositorio_parser,
                            )}
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
        </Grid>
        {!matches ? (
          <StackButton />
        ) : (
          <Stack spacing={2} direction="column" my={2} mx={6}>
            <Button
              variant="outlined"
              color="info"
              endIcon={<IosShareIcon />}
              onClick={() => setModalIsOpen(true)}
            >
              COMPARTILHAR
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<CloudDownloadIcon />}
              onClick={() => {
                ReactGA.pageview(url.downloadURL(fileLink));
              }}
              href={url.downloadURL(fileLink)}
            >
              BAIXAR{' '}
              <GreenColor>{formatBytes(mi.pacote_de_dados.size)}</GreenColor>
            </Button>
            <Button
              variant="outlined"
              color="info"
              endIcon={<SearchIcon />}
              onClick={() => {
                router.push(
                  `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
                );
              }}
            >
              PESQUISAR
            </Button>
          </Stack>
        )}
      </ThemeProvider>
      <ShareModal
        url={`https://dadosjusbr.org/orgao/${agency}/${year}/${month}`}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </>
  );
};

const ActivityIndicatorPlaceholder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rem 0;
  span {
    margin-top: 3rem;
  }
  font-family: 'Roboto Condensed', sans-serif;
  color: ${(p: { fontColor?: string }) => (p.fontColor ? p.fontColor : '#FFF')};
  font-size: 3rem;
  align-items: center;
`;

export const GreenColor = styled.span`
  margin-left: 0.5em;
  color: #00bfa6;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default OMASummary;
