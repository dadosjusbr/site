import { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
  monthsWithoutData,
  warningMessage,
  yearsWithoutData,
} from './functions';
import { graphOptions, graphSeries } from './functions/graphConfigs';
import NotCollecting from '../NotCollecting';
import RemunerationChartLegend from '../RemunerationChartLegend';

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
  const matches = useMediaQuery('(max-width:500px)');
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [graphType, setGraphType] = useState('media-por-membro');

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
        <Box mb={10}>
          <Paper elevation={0}>
            <RemunerationChartLegend
              agency={agency}
              data={data}
              year={year}
              graphType={graphType}
              setGraphType={setGraphType}
              baseRemunerationDataTypes={baseRemunerationDataTypes}
              otherRemunerationsDataTypes={otherRemunerationsDataTypes}
              hidingWage={hidingWage}
              setHidingWage={setHidingWage}
              hidingBenefits={hidingBenefits}
              setHidingBenefits={setHidingBenefits}
              hidingNoData={hidingNoData}
              setHidingNoData={setHidingNoData}
              monthsWithoutData={monthsWithoutData}
              yearsWithoutData={yearsWithoutData}
              warningMessage={warningMessage(
                data,
                baseRemunerationDataTypes,
                otherRemunerationsDataTypes,
              )}
              annual
            />
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
        </Box>
      )}
    </>
  );
};

export default AnnualRemunerationGraph;
