import { useMemo, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

import {
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
  Container,
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
  const acesso = props.children;
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
  const texto = props.children;
  const tipo = props.tipo;
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
  const fileLink = useMemo(() => chartData.PackageURL, [chartData]);
  const matches = useMediaQuery('(max-width:500px)');
  const router = useRouter();
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        {...(matches && {
          direction: 'column',
        })}
        justifyContent="flex-end"
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
          VOLTAR PARA EXPLORAR POR ANO
        </Button>
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
          BAIXAR DADOS
        </Button>
        <Button
          variant="outlined"
          color="info"
          startIcon={<SearchIcon />}
          onClick={() => {
            router.push(
              `/pesquisar?anos=${year}&meses=${month}&orgaos=${agency}`,
            );
          }}
        >
          PESQUISA AVANÇADA
        </Button>
      </Stack>
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
                    {mi.Score?.indice_transparencia == undefined
                      ? 'Indisponível'
                      : mi.Score?.indice_transparencia.toFixed(2)}
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
                            mi.Score?.indice_completude == undefined
                              ? 'Indisponível'
                              : mi.Score?.indice_completude.toFixed(2)
                          }`}
                          primaryTypographyProps={{
                            variant: 'h6',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        {mi.Meta?.tem_lotacao == null ? (
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
                            textDecoration: mi.Meta?.tem_lotacao
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        {mi.Meta?.tem_cargo == null ? (
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
                            textDecoration: mi.Meta?.tem_cargo
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        {mi.Meta?.tem_matricula == null ? (
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
                            textDecoration: mi.Meta?.tem_matricula
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.Meta?.remuneracao_basica}>
                              remuneração básica
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.Meta?.despesas}>
                              descontos
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.Meta?.outras_receitas}>
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
                            mi.Score?.indice_facilidade == undefined
                              ? 'Indisponível'
                              : mi.Score?.indice_facilidade.toFixed(2)
                          }`}
                          primaryTypographyProps={{
                            variant: 'h6',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={<ShowAcesso>{mi.Meta?.acesso}</ShowAcesso>}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {mi.Meta?.manteve_consistencia_no_formato == null ? (
                            <Close color="error" />
                          ) : (
                            <Done color="success" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary="Manteve consistência no formato"
                          sx={{
                            textDecoration: mi.Meta
                              ?.manteve_consistencia_no_formato
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          {mi.Meta?.dados_estritamente_tabulares == null ? (
                            <Close color="error" />
                          ) : (
                            <Done color="success" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary="Dados estritamente tabulares"
                          sx={{
                            textDecoration: mi.Meta
                              ?.dados_estritamente_tabulares
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        {mi.Meta?.formato_aberto == null ||
                        mi.Meta?.formato_aberto == false ? (
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
                            textDecoration: mi.Meta?.formato_aberto
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
                  {!chartData.Members ? (
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
                            chartData.Members['-1'],
                            chartData.Members['50000'],
                            chartData.Members['40000'],
                            chartData.Members['30000'],
                            chartData.Members['20000'],
                            chartData.Members['10000'],
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
        </Grid>
        <Stack
          spacing={2}
          direction="row"
          {...(matches && {
            direction: 'column',
          })}
          justifyContent="flex-end"
          my={4}
        >
          <Button
            variant="outlined"
            color="info"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              router.back();
            }}
          >
            VOLTAR PARA EXPLORAR POR ANO
          </Button>
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
            BAIXAR DADOS
          </Button>
        </Stack>
      </ThemeProvider>
      <ShareModal
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

const Sub = styled.span`
  text-transform: lowercase;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default OMASummary;
