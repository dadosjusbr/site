import { useMemo, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
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
      return <span>Acesso direto</span>;
      break;
    case 'AMIGAVEL_PARA_RASPAGEM':
      return <span>Amigável para raspagem</span>;
      break;
    case 'RASPAGEM_DIFICULTADA':
      return <span>Raspagem dificultada</span>;
      break;
    case 'NECESSITA_SIMULACAO_USUARIO':
      return <span>É possível navegar no html do site</span>;
      break;
    default:
      return <span>--</span>;
      break;
  }
}
function ShowTipoDado(props) {
  const texto = props.children;
  const tipo = props.tipo;
  switch (tipo) {
    case 'SUMARIZADO':
      return <span>Disponibiliza dados de {texto} sumarizados</span>;
      break;
    case 'DETALHADO':
      return <span>Disponibiliza dados de {texto} detalhados</span>;
      break;
    default:
      return <span>Não disponibiliza dados de {texto}</span>;
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
  return (
    <>
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
      <ThemeProvider theme={light}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0}>
              <Box p={2}>
                <Typography variant="h6">
                  Remuneração
                  <Tooltip
                    placement="top"
                    title={
                      <Typography fontSize="0.8rem">
                        <p>
                          <b>Salário:</b> valor recebido de acordo com a
                          prestação de serviços, em decorrência do contrato de
                          trabalho.
                        </p>
                        <p>
                          <b>Remuneração:</b> é a soma do salário mais outras
                          vantagens (indenizações e benefícios). - Benefício:
                          valores eventuais, por exemplo, auxílios alimentação,
                          saúde, escolar... - Membro: é o integrante da carreira
                          &apos;principal&apos; do órgão do sistema de justiça.
                          Por exemplo, juízes, desembargadores, ministros,
                          defensores, procuradores públicos, promotores de
                          justiça, procuradores de justiça, etc...
                        </p>
                      </Typography>
                    }
                  >
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBalanceWalletIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Maior salário: R$ ${(maxWage / 1000).toFixed(
                        2,
                      )} mil`}
                      secondary={`Total de salários: R$ ${(
                        totalWage / 100000
                      ).toFixed(2)}M`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CardGiftcardIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Maior benefício: R$ ${(maxPerk / 1000).toFixed(
                        2,
                      )} mil`}
                      secondary={`Total de benefícios: R$ ${(
                        totalPerks / 1000000
                      ).toFixed(2)}M`}
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ height: 208 }}>
              <Box p={2}>
                <Typography variant="h6">Membros</Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmojiPeopleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Total de membros ${totalMembers}`}
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <Box p={2}>
                <Typography variant="h6">
                  Índice de transparência em <Sub>{MONTHS[month]}</Sub> de {year}
                  <Tooltip
                    placement="top"
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
                <Typography variant="h6" textAlign="center">
                  Índice de transparência:{' '}
                  <b>{mi.at(0).Score?.indice_transparencia.toFixed(2)}</b>
                </Typography>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={`Índice de completude: ${mi.at(0).Score?.indice_completude.toFixed(
                            2,
                          )}`}
                          primaryTypographyProps={{
                            variant: 'h6',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Tem lotação"
                          sx={{
                            textDecoration: mi.at(0).Meta?.tem_lotacao
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Tem cargo"
                          sx={{
                            textDecoration: mi.at(0).Meta?.tem_cargo
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Tem matrícula e nome"
                          sx={{
                            textDecoration: mi.at(0).Meta?.tem_matricula
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.at(0).Meta?.remuneracao_basica}>
                              remuneração básica
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.at(0).Meta?.despesas}>
                              despesas
                            </ShowTipoDado>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <ShowTipoDado tipo={mi.at(0).Meta?.outras_receitas}>
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
                          primary={`Índice de facilidade: ${mi.at(0).Score?.indice_facilidade.toFixed(
                            2,
                          )}`}
                          primaryTypographyProps={{
                            variant: 'h6',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Não é necessário login"
                          sx={{
                            textDecoration: mi.at(0).Meta?.login_nao_necessario
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Não é necessário captcha"
                          sx={{
                            textDecoration: mi.at(0).Meta?.captcha_nao_necessario
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={<ShowAcesso>{mi.at(0).Meta?.acesso}</ShowAcesso>}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Manteve consistência no formato"
                          sx={{
                            textDecoration: mi.at(0).Meta
                              ?.manteve_consistencia_no_formato
                              ? null
                              : 'line-through',
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Dados estritamente tabulares"
                          sx={{
                            textDecoration: mi.at(0).Meta
                              ?.dados_estritamente_tabulares
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
              <Box pt={4} py={4}>
                <Typography variant="h6" textAlign="center">
                  Total de remunerações de membros por mês em {year}
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
        <Stack spacing={2} direction="row" justifyContent="flex-end" my={4}>
          <Button
            variant="outlined"
            color="info"
            startIcon={<ArrowBackIcon />}
            href={`/orgao/${agency}/${year}`}
          >
            Voltar para explorar por ano
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

export default OMASummary;
