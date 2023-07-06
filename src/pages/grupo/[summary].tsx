import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';
import DropDownGroupSelector, {
  formatToAgency,
} from '../../components/DropDownGroupSelector';
import { getCurrentYear } from '../../functions/currentYear';
import AgencyWithoutNavigation from '../../components/AgencyWithoutNavigation';
import { normalizePlotData } from '../../functions/normalize';
// this constant is used to placehold the max value of a chart data
export default function SummaryPage({ dataList, summary }) {
  const pageTitle = `${formatToAgency(summary)}`;
  const [value, setValue] = useState('');
  return (
    <Page>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:image" content="/img/icon_dadosjus_background.png" />
        <meta
          property="og:title"
          content={`Veja os dados sobre ${formatToAgency(summary)}`}
        />
        <meta
          property="og:description"
          content="DadosJusBr é uma plataforma que realiza a libertação continua de dados de remuneração de sistema de justiça brasileiro"
        />
      </Head>
      <Header />
      <Container>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          py={4}
          my={4}
        >
          <Grid item pb={4}>
            <Typography>Selecione o grupo</Typography>

            <DropDownGroupSelector value={summary} />
          </Grid>
          <Grid item pb={4}>
            <Typography>Selecione o órgão</Typography>

            <FormControl fullWidth sx={{ m: 1, minWidth: 240, maxWidth: 250 }}>
              <Select
                id="orgaos-select"
                labelId="orgaos-select-label"
                defaultValue="Selecione um órgão"
                value={value}
                onChange={e => setValue(e.target.value)}
                label="Estados"
                displayEmpty
                inputProps={{ 'aria-label': 'Dados por órgão' }}
                input={<OutlinedInput />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em>Selecione</em>;
                  }
                  return selected;
                }}
              >
                <ListSubheader>
                  <em>Órgãos disponíveis</em>
                </ListSubheader>

                {dataList
                  .sort((a, b) => {
                    if (a.id_orgao < b.id_orgao) {
                      return -1;
                    }
                    if (a.id_orgao > b.id_orgao) {
                      return 1;
                    }
                    return 1;
                  })
                  .map(ag => (
                    <MenuItem
                      key={ag.id_orgao}
                      value={ag.id_orgao.toUpperCase()}
                    >
                      <LinkTo href={`#${ag.id_orgao}`}>{ag.nome}</LinkTo>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div>
          {(() => {
            if (typeof dataList !== 'undefined' && dataList.length > 0) {
              return dataList.map(agency => (
                <GraphWithNavigation
                  key={agency.id_orgao}
                  title={agency.nome}
                  id={agency.id_orgao}
                />
              ));
            }
            return (
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
            );
          })()}
        </div>
      </Container>
      <Footer />
    </Page>
  );
}
// this component is used to to build the main section, with charts and pagination.
// his load some agency so, it needs params to load it.
// the id is the main identifier.
// the title is the vocative from the componenet.

const GraphWithNavigation: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  // this state is used to store the api fetched data after fetch it
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState(getCurrentYear());
  const [agencyData, setAgencyData] = useState<any>();
  const [dataLoading, setDataLoading] = useState(true);
  const [plotData, setPlotData] = useState<AggregateIndexes[]>([]);

  useEffect(() => {
    setDataLoading(true);
    Promise.all([fetchAgencyData(), fetchPlotData()]).finally(() =>
      setDataLoading(false),
    );
  }, [year]);
  async function fetchAgencyData() {
    try {
      const { data: agency } = await api.ui.get(`/v2/orgao/resumo/${id}`);
      setData(agency.dados_anuais ? agency.dados_anuais : null);
      setAgencyData(agency.orgao);
      setYear(agency.dados_anuais?.at(-1).ano);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPlotData() {
    try {
      const { data: transparencyPlot } = await api.default.get(
        `/indice/orgao/${id}`,
      );
      setPlotData(transparencyPlot);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div id={id}>
      <AgencyWithoutNavigation
        data={data}
        dataLoading={dataLoading}
        id={id}
        title={title}
        year={year}
        agency={agencyData}
        plotData={normalizePlotData(plotData)}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { summary } = context.params;
  try {
    const { data } = await api.ui.get(`/v2/orgao/${summary}`);
    if (!data.orgaos) {
      // context.res.writeHead(301, {
      //   Location: `/404`,
      // });
      // context.res.end();
      return { props: {} };
    }
    return {
      props: {
        dataList: data.orgaos,
        summary: data.grupo,
      },
    };
  } catch (error) {
    // context.res.writeHead(301, {
    //   Location: `/404`,
    // });
    // context.res.end();
    return { props: {} };
  }
};
const Page = styled.div`
  background: #3e5363;
`;
const LinkTo = styled.a`
  width: 100%;
  text-decoration: none;
  color: #fff;
`;
