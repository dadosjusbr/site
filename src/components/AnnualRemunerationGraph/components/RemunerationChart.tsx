import { useState, Suspense } from 'react';
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

import { warningMessage, yearsWithoutData } from '../functions';
import { graphOptions, graphSeries } from '../functions/graphConfigs';
import NotCollecting from '../../Common/NotCollecting';
import RemunerationChartLegend from '../../RemunerationChartLegend';
import { useRemunerationDataTypes } from '../../../hooks/useRemunerationTypes';
import MoneyHeadingsChart from '../../MoneyHeadingsChart/index.tsx';

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
  const [hidingRemunerations, setHidingRemunerations] = useState(false);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [graphType, setGraphType] = useState('media-por-membro');
  const [
    baseRemunerationDataTypes,
    otherRemunerationsDataTypes,
    discountsDataTypes,
  ] = useRemunerationDataTypes(graphType);

  return (
    <>
      {agency && agency?.coletando && !data ? (
        <NotCollecting agency={agency} />
      ) : (
        <Box>
          <Paper elevation={0}>
            <RemunerationChartLegend
              agency={agency}
              data={data}
              graphType={graphType}
              setGraphType={setGraphType}
              baseRemunerationDataTypes={baseRemunerationDataTypes}
              otherRemunerationsDataTypes={otherRemunerationsDataTypes}
              discountsDataTypes={discountsDataTypes}
              hidingRemunerations={hidingRemunerations}
              setHidingRemunerations={setHidingRemunerations}
              hidingWage={hidingWage}
              setHidingWage={setHidingWage}
              hidingBenefits={hidingBenefits}
              setHidingBenefits={setHidingBenefits}
              hidingNoData={hidingNoData}
              setHidingNoData={setHidingNoData}
              warningMessage={warningMessage(
                data,
                baseRemunerationDataTypes,
                otherRemunerationsDataTypes,
              )}
              annual
            />
            <Box px={2}>
              {agency && data && !dataLoading ? (
                <Grid display="flex" justifyContent="flex-end" mr={1} mt={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ArrowForwardIosIcon />}
                    href={`/orgao/${agency.id_orgao}/${year}`}
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
                          options={graphOptions({
                            agency,
                            data,
                            matches,
                            baseRemunerationDataTypes,
                            otherRemunerationsDataTypes,
                          })}
                          series={graphSeries({
                            data,
                            baseRemunerationDataTypes,
                            otherRemunerationsDataTypes,
                            discountsDataTypes,
                            hidingRemunerations,
                            hidingBenefits,
                            hidingWage,
                            hidingNoData,
                            matches,
                          })}
                          width="100%"
                          height="500"
                          type="line"
                        />
                        <MoneyHeadingsChart
                          data={data}
                          yearsWithoutData={yearsWithoutData(data)}
                          width={400}
                          height={350}
                        />
                      </Suspense>
                    </Box>
                  ) : (
                    <Typography variant="body1" py={2} textAlign="center">
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
