import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Typography,
  Button,
  ThemeProvider,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';

import styled from 'styled-components';
import ShareModal from './ShareModal';
import light from '../styles/theme-light';
import { formatAgency } from '../functions/format';
import Drawer from './Drawer';
import AnualRemunerationGraph from './AnualRemunerationGraph';

export interface AgencyPageWithoutNavigationProps {
  id: string;
  year: number;
  agency: any;
  title: string;
  data: any[];
  dataLoading: boolean;
}

const AgencyPageWithoutNavigation: React.FC<AgencyPageWithoutNavigationProps> = ({
  id,
  title,
  year,
  agency,
  data,
  dataLoading,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const matches = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  return (
    <Container fixed>
      <Box>
        <Typography variant="h2" textAlign="center">
          {title} ({formatAgency(id.toLocaleUpperCase('pt'))})
        </Typography>
        {agency && agency.coletando ? (
          <></>
        ) : (
          <>
            {!matches ? (
              <Div>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="flex-start"
                  my={4}
                >
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => router.back()}
                  >
                    VOLTAR
                  </Button>
                </Stack>

                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  my={4}
                >
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
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(`/pesquisar?orgaos=${agency.id_orgao}`);
                    }}
                  >
                    PESQUISAR
                  </Button>
                </Stack>
              </Div>
            ) : (
              <Drawer>
                <Stack
                  direction="column"
                  spacing={1}
                  justifyContent="flex-start"
                  mt={3}
                  mx={6}
                >
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
                    endIcon={<SearchIcon />}
                    onClick={() => {
                      router.push(`/pesquisar?orgaos=${agency.id_orgao}`);
                    }}
                  >
                    PESQUISAR
                  </Button>
                </Stack>
              </Drawer>
            )}
          </>
        )}
      </Box>
      <ThemeProvider theme={light}>
        <Box mb={12}>
          <AnualRemunerationGraph
            data={data}
            year={year}
            agency={agency}
            dataLoading={dataLoading}
          />
        </Box>
      </ThemeProvider>

      <ShareModal
        isOpen={modalIsOpen}
        url={`https://dadosjusbr.org/orgao/${id}`}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </Container>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AgencyPageWithoutNavigation;
