import React, { Suspense, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
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

import Footer from '../../components/Essentials/Footer';
import Header from '../../components/Essentials/Header';
import api from '../../services/api';
import DropDownGroupSelector from '../../components/Common/DropDownGroupSelector';
import { getCurrentYear } from '../../functions/currentYear';
import AgencyWithoutNavigation from '../../components/AnnualRemunerationGraph';
import { formatToAgency, orderStringsWithNum } from '../../functions/format';

type chartDataType = {
  dados_anuais?: AnnualSummaryData[];
  orgao: Agency;
};

export default function SummaryPage({
  dataList,
  summary,
  chartData,
}: {
  dataList: v2AgencyBasic[];
  summary: string;
  chartData: chartDataType[];
}) {
  const pageTitle = `${formatToAgency(summary)}`;
  const [value, setValue] = useState('');
  chartData?.sort((a, b) =>
    orderStringsWithNum(a.orgao.id_orgao, b.orgao.id_orgao),
  );

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

            <DropDownGroupSelector value={summary} inputType="outlined" />
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
                sx={{
                  height: 40,
                  pb: 0,
                  pt: 0,
                }}
              >
                <ListSubheader>
                  <em>Órgãos disponíveis</em>
                </ListSubheader>

                {dataList
                  ?.sort((a, b) => orderStringsWithNum(a.id_orgao, b.id_orgao))
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
              return dataList.map((agency, i) => (
                <Suspense fallback={<CircularProgress />}>
                  <Box mb={12} key={agency.id_orgao}>
                    <div id={agency.id_orgao}>
                      <AgencyWithoutNavigation
                        data={chartData[i]?.dados_anuais}
                        dataLoading={false}
                        id={agency?.id_orgao}
                        title={agency?.nome}
                        year={getCurrentYear()}
                        agency={chartData[i]?.orgao}
                      />
                    </div>
                  </Box>
                </Suspense>
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = [
      { params: { summary: 'justica-estadual' } },
      { params: { summary: 'ministerios-publicos' } },
      { params: { summary: 'justica-do-trabalho' } },
      { params: { summary: 'justica-militar' } },
      { params: { summary: 'justica-federal' } },
      { params: { summary: 'justica-eleitoral' } },
      { params: { summary: 'justica-superior' } },
      { params: { summary: 'conselhos-de-justica' } },
    ];
    return {
      paths: [],
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async context => {
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

    const chartData = [];
    try {
      const request = data?.orgaos.map(async item => {
        const response = await api.ui.get(`/v2/orgao/resumo/${item.id_orgao}`);
        chartData.push(response.data);
      });
      await Promise.all(request);
    } catch (error) {
      throw new Error(error);
    }

    return {
      props: {
        dataList: data.orgaos,
        summary: data.grupo,
        chartData,
      },
      revalidate: 3600,
    };
  } catch (error) {
    throw new Error(
      `Erro ao buscar dados do grupo do grupo de órgãos - ${error}`,
    );
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
