import { useState, Suspense, useEffect } from 'react';
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

import { warningMessage } from '../functions';
import { graphOptions, graphSeries } from '../functions/graphConfigs';
import NotCollecting from '../../Common/NotCollecting';
import RemunerationChartLegend from '../../RemunerationChartLegend';
import { useRemunerationDataTypes } from '../../../hooks/useRemunerationTypes';
import api from '../../../services/api';

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
  const [agencyInfo, setAgencyInfo] = useState<AllAgencyInformation>();
  const { baseRemunerationDataTypes, otherRemunerationsDataTypes } =
    useRemunerationDataTypes(graphType);

  const getAgencyInfo = async () => {
    try {
      const {
        data: response,
      }: {
        data: AllAgencyInformation;
      } = await api.default.get(`/dados/${agency.id_orgao}`);

      setAgencyInfo(response);
    } catch (err) {
      throw new Error(err, {
        cause: 'Error while fetching agency information',
      });
    }
  };

  useEffect(() => {
    getAgencyInfo();
  }, []);

  return (
    <>
      {agency && agency?.coletando && !agency?.possui_dados ? (
        <NotCollecting agency={agency} />
      ) : (
        <Box>
          <Paper elevation={0}>
            <Suspense
              fallback={<CircularProgress aria-label="Carregando dados" />}
            >
              <RemunerationChartLegend
                agency={agency}
                data={data}
                graphType={graphType}
                setGraphType={setGraphType}
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
                  agency,
                  agencyInfo,
                  baseRemunerationDataTypes,
                  otherRemunerationsDataTypes,
                )}
                annual
              />
            </Suspense>
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
                  {data?.length > 0 ? (
                    <Box>
                      <Suspense fallback={<CircularProgress />}>
                        <Chart
                          options={graphOptions({
                            agency,
                            data,
                            matches,
                            graphType,
                            agencyInfo,
                          })}
                          series={graphSeries({
                            data,
                            graphType,
                            hidingRemunerations,
                            hidingBenefits,
                            hidingWage,
                            hidingNoData,
                            matches,
                            agencyInfo,
                          })}
                          width="100%"
                          height="500"
                          type="line"
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
