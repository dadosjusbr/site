/* eslint-disable no-restricted-syntax */
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { graphOptions, graphSeries } from '../functions/graphConfigs';
import CrawlingDateTable from '../../Common/CrawlingDateTable';
import NotCollecting from '../../Common/NotCollecting';
import { warningMessage } from '../functions';
import RemunerationLegend from '../../RemunerationChartLegend';
import { useRemunerationDataTypes } from '../../../hooks/useRemunerationTypes';

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
  const [hidingRemunerations, setHidingRemunerations] = useState(false);
  const [hidingWage, setHidingWage] = useState(false);
  const [hidingBenefits, setHidingBenefits] = useState(false);
  const [hidingNoData, setHidingNoData] = useState(false);
  const [hidingErrors] = useState(false);
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
        <>
          <Paper elevation={0}>
            {data.length > 0 ? (
              <RemunerationLegend
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
                warningMessage={warningMessage({ data, year })}
              />
            ) : (
              <Box display="flex" alignItems="center" justifyContent="center">
                <Image src="/img/undraw_cancel.svg" width={200} height={200} />
              </Box>
            )}
            <Box px={2}>
              {agency && data.length > 0 && !dataLoading && (
                <Grid display="flex" justifyContent="flex-end" mr={1} mt={1}>
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
                          otherRemunerationsDataTypes,
                        })}
                        series={graphSeries({
                          data,
                          year,
                          agency,
                          hidingRemunerations,
                          hidingBenefits,
                          hidingWage,
                          hidingErrors,
                          hidingNoData,
                          baseRemunerationDataTypes,
                          otherRemunerationsDataTypes,
                          discountsDataTypes,
                        })}
                        width="100%"
                        height="500"
                        type="line"
                      />
                    </Box>
                  ) : (
                    <Typography variant="body1" py={2} textAlign="center">
                      O <strong>{agency?.id_orgao.toUpperCase()}</strong> não
                      disponibilizou os dados de <strong>{year}</strong>.
                    </Typography>
                  )}
                </>
              )}
            </Box>
            {data && data.length > 0 && agency && (
              <Box display="flex" justifyContent="center" pb={2}>
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
