/* eslint-disable no-restricted-syntax */
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CrawlingDateTable from '../CrawlingDateTable';
import NotCollecting from '../NotCollecting';
import AlertModal from '../AlertModal';
import { formatCurrencyValue } from '../../functions/format';
import { graphOptions, graphSeries } from './graphConfigs';
import { monthsWithouData } from './functions';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface RemunerationBarGraphProps {
  year: number;
  agency: Agency;
  data: v2MonthTotals[];
  dataLoading: boolean;
  selectedMonth?: number;
}

const RemunerationBarGraph: React.FC<RemunerationBarGraphProps> = ({
  year,
  agency,
  data,
  dataLoading = true,
  selectedMonth,
}) => {
  console.log(data);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [hidingErrors, setHidingErrors] = useState(false);
  const [graphType, setGraphType] = useState('media-por-membro');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const baseRemunerationDataTypes = useMemo(() => {
    if (graphType === 'media-por-membro' && agency) {
      return 'remuneracao_base_por_membro';
    }
    return 'remuneracao_base';
  }, [graphType]);

  const othersRemunerationsDataTypes = useMemo(() => {
    if (graphType === 'media-por-membro' && agency) {
      return 'outras_remuneracoes_por_membro';
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
              display="flex"
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              mb={4}
            >
              <Box maxWidth={{ xs: 320, sm: 720 }} mb={1}>
                {agency != null &&
                  data.length < 12 &&
                  data.length > 0 &&
                  monthsWithouData({ data, year }).length > 0 && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <AlertModal
                        agencyData={agency}
                        openParam={open}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                      >
                        Este órgão não publicou dados de{' '}
                        {`${monthsWithouData({ data, year }).length} ${
                          monthsWithouData({ data, year }).length > 1
                            ? 'meses.'
                            : 'mês.'
                        }`}
                      </AlertModal>
                    </Box>
                  )}
                {agency && (
                  <Tabs
                    value={graphType}
                    onChange={(event: React.SyntheticEvent, newValue: any) =>
                      setGraphType(newValue)
                    }
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="Opções de gráfico"
                    sx={{ mt: 2 }}
                  >
                    <Tab value="media-por-membro" label="Média por membro" />
                    <Tab value="total" label="Total de remunerações" />
                  </Tabs>
                )}
              </Box>
              <Typography variant="h5" textAlign="center" mt={2}>
                Total de remunerações de membros em {year}: R${' '}
                {(() => {
                  // this function is used to sum the data from all money arrays and generate the last remuneration value
                  let total = 0;
                  const monthlyTotals = data.map(
                    d =>
                      d[baseRemunerationDataTypes] +
                      d[othersRemunerationsDataTypes],
                  );
                  monthlyTotals.forEach(w => {
                    total += w;
                  });
                  // here we return the final value to millions showing 2 decimal places
                  return formatCurrencyValue(total);
                })()}
                <Tooltip
                  placement="top"
                  title={
                    <Typography fontSize="0.8rem">
                      <p>
                        <b>Membros:</b> Participantes ativos do órgao, incluindo
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
                  <IconButton aria-label="Botão de informações">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
            <Grid
              container
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
                      d => d[othersRemunerationsDataTypes],
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
              {agency && data.length > 0 && !dataLoading && (
                <Grid display="flex" justifyContent="flex-end" mr={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowForwardIosIcon />}
                    href={`/orgao/${agency.id_orgao}/${year}/${selectedMonth}`}
                  >
                    EXPLORAR
                  </Button>
                </Grid>
              )}
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
                      <Chart
                        options={graphOptions({
                          agency,
                          data,
                          year,
                          baseRemunerationDataTypes,
                          othersRemunerationsDataTypes,
                        })}
                        series={graphSeries({
                          data,
                          year,
                          hidingBenefits,
                          hidingWage,
                          hidingErrors,
                          hidingNoData,
                          baseRemunerationDataTypes,
                          othersRemunerationsDataTypes,
                        })}
                        width="100%"
                        height="500"
                        type="bar"
                      />
                    </Box>
                  ) : (
                    <Typography variant="body1" mt={2} textAlign="center">
                      Não há dados para esse ano.
                    </Typography>
                  )}
                </>
              )}
            </Box>
            {data && data.length > 0 && agency && (
              <Box display="flex" justifyContent="center" pb={4}>
                <CrawlingDateTable data={data} dataLoading={dataLoading} />
              </Box>
            )}
          </Paper>
        </>
      )}
    </>
  );
};

export default RemunerationBarGraph;
