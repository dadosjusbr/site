import { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Tooltip,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import NotCollecting from '../NotCollecting';
import AlertModal from '../AlertModal';
import {
  monthsWithoutData,
  warningMessage,
  yearsWithoutData,
} from './functions';
import { formatCurrencyValue } from '../../functions/format';
import { graphOptions, graphSeries } from './graphConfigs';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type AnnualRemunerationGraphProps = {
  year: number;
  agency: Agency;
  data: AnnualSummaryData[];
  dataLoading: boolean;
};

const AnnualRemunerationGraph: React.FC<AnnualRemunerationGraphProps> = ({
  year,
  agency,
  data,
  dataLoading = true,
}) => {
  console.log(data);
  const matches = useMediaQuery('(max-width:500px)');
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [graphType, setGraphType] = useState('media-por-membro');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const baseRemunerationDataTypes = useMemo(() => {
    if (graphType === 'media-por-membro') {
      return 'remuneracao_base_por_membro';
    }
    if (graphType === 'media-mensal') {
      return 'remuneracao_base_por_mes';
    }
    return 'remuneracao_base';
  }, [graphType]);

  const otherRemunerationsDataTypes = useMemo(() => {
    if (graphType === 'media-por-membro') {
      return 'outras_remuneracoes_por_membro';
    }
    if (graphType === 'media-mensal') {
      return 'outras_remuneracoes_por_mes';
    }
    return 'outras_remuneracoes';
  }, [graphType]);

  return (
    <>
      {agency && agency.coletando && !data ? (
        <NotCollecting agency={agency} />
      ) : (
        <>
          <Paper elevation={0}>
            <Box
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <Box sx={{ maxWidth: { xs: 320, sm: 720 }, marginBottom: 2 }}>
                {!dataLoading &&
                  (yearsWithoutData(data).length > 0 ||
                    monthsWithoutData(data) > 0) && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <AlertModal
                        agencyData={agency}
                        openParam={open}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                      >
                        {warningMessage(
                          data,
                          baseRemunerationDataTypes,
                          otherRemunerationsDataTypes,
                        )}
                      </AlertModal>
                    </Box>
                  )}
                <Tabs
                  value={graphType}
                  onChange={(event: React.SyntheticEvent, newValue: any) =>
                    setGraphType(newValue)
                  }
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="Opções de gráfico"
                  sx={{ my: 2 }}
                >
                  <Tab value="media-por-membro" label="Média por membro" />
                  <Tab value="media-mensal" label="Média mensal" />
                  <Tab value="total" label="Total de remunerações" />
                </Tabs>
              </Box>
              <Typography variant="h5">
                {graphType === 'media-por-membro' &&
                  'Em média, cada membro deste órgão recebeu: '}
                {graphType === 'media-mensal' &&
                  'Em média, este órgão gastou mensalmente: '}
                {graphType === 'total' && 'Total de gastos deste órgão: '}
                {(() => {
                  // this function is used to sum the data from all money arrays and generate the last remuneration value
                  let total = 0;
                  const yearlyTotals = data.map(
                    d =>
                      d[baseRemunerationDataTypes] +
                      d[otherRemunerationsDataTypes],
                  );

                  yearlyTotals.forEach(w => {
                    total += w;
                  });

                  if (graphType === 'total') {
                    return formatCurrencyValue(total);
                  }

                  return formatCurrencyValue(total / data.length);
                })()}
                <Tooltip
                  placement="top"
                  title={
                    <Typography fontSize="0.8rem">
                      <p>
                        <b>Membros:</b> Participantes ativos do órgão, incluindo
                        os servidores públicos, os militares e os membros do
                        Poder Judiciário.
                      </p>
                      <p>
                        <b>Servidor:</b> Funcionário público que exerce cargo ou
                        função pública, com vínculo empregatício, e que recebe
                        remuneração fixa ou variável.
                      </p>
                      <p>
                        <b>Salário:</b> Valor recebido de acordo com a prestação
                        de serviços, em decorrência do contrato de trabalho.
                      </p>
                      <p>
                        <b>Benefícios:</b> Qualquer remuneração recebida por um
                        funcionário que não seja proveniente de salário.
                        Exemplos de benefícios são: diárias, gratificações,
                        remuneração por função de confiança, benefícios pessoais
                        ou eventuais, auxílios alimentação, saúde, escolar...
                      </p>
                      <p>
                        <b>Sem dados:</b> Quando um órgão não disponibiliza os
                        dados de um determinado mês
                      </p>
                    </Typography>
                  }
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
            <Grid
              container
              pt={4}
              px={2}
              maxWidth={650}
              margin="auto"
              justifyContent="space-between"
            >
              <Grid xs={5} md={3} item textAlign="center">
                <IconButton
                  sx={{ backgroundColor: '#2fbb95' }}
                  onClick={e => {
                    if (hidingWage) {
                      e.currentTarget.classList.remove('active');
                      setHidingWage(false);
                    } else {
                      e.currentTarget.classList.add('active');
                      setHidingWage(true);
                    }
                  }}
                >
                  <AccountBalanceWalletIcon />
                </IconButton>
                <Typography pt={1}>
                  Salário:{' '}
                  {(() => {
                    let total = 0;
                    const yearlyTotals = data.map(
                      d => d[baseRemunerationDataTypes],
                    );

                    yearlyTotals.forEach(w => {
                      total += w;
                    });

                    return formatCurrencyValue(total);
                  })()}
                </Typography>
              </Grid>
              <Grid xs={5} md={3} item textAlign="center">
                <IconButton
                  sx={{ backgroundColor: '#96bb2f' }}
                  onClick={e => {
                    if (hidingBenefits) {
                      e.currentTarget.classList.remove('active');
                      setHidingBenefits(false);
                    } else {
                      e.currentTarget.classList.add('active');
                      setHidingBenefits(true);
                    }
                  }}
                >
                  <CardGiftcardIcon />
                </IconButton>
                <Typography pt={1}>
                  Benefícios:{' '}
                  {(() => {
                    let total = 0;
                    const yearlyTotals = data.map(
                      d => d[otherRemunerationsDataTypes],
                    );

                    yearlyTotals.forEach(w => {
                      total += w;
                    });

                    return formatCurrencyValue(total);
                  })()}
                </Typography>
              </Grid>
              <Grid xs={5} md={3} item textAlign="center">
                <IconButton
                  sx={{ backgroundColor: '#3E5363' }}
                  onClick={e => {
                    if (hidingNoData) {
                      e.currentTarget.classList.remove('active');
                      setHidingNoData(false);
                    } else {
                      e.currentTarget.classList.add('active');
                      setHidingNoData(true);
                    }
                  }}
                >
                  <CropSquareIcon />
                </IconButton>
                <Typography pt={1}>Sem dados</Typography>
              </Grid>
            </Grid>
            <Box px={2}>
              {agency && data && !dataLoading ? (
                <Grid display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowForwardIosIcon />}
                    href={`/orgao/${agency.id_orgao}/${year}`}
                    sx={{ mr: 2 }}
                  >
                    EXPLORAR
                  </Button>
                </Grid>
              ) : null}
              {dataLoading ? (
                <Box
                  m={4}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <CircularProgress color="info" />
                  </div>
                  <p>Aguarde...</p>
                </Box>
              ) : (
                <>
                  {data.length > 0 ? (
                    <Box>
                      <Suspense fallback={<CircularProgress />}>
                        <Chart
                          options={graphOptions({ agency, data, matches })}
                          series={graphSeries({
                            data,
                            baseRemunerationDataTypes,
                            otherRemunerationsDataTypes,
                            hidingBenefits,
                            hidingWage,
                            hidingNoData,
                            matches,
                          })}
                          width="100%"
                          height="500"
                          type="bar"
                        />
                      </Suspense>
                    </Box>
                  ) : (
                    <Typography variant="body1" mt={2} textAlign="center">
                      Não há dados para esse ano.
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default AnnualRemunerationGraph;
