import { useState } from 'react';
import styled from 'styled-components';
import { Typography, Grid, Link, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Apartment,
  PaymentsOutlined,
  ReceiptLongOutlined,
} from '@mui/icons-material';
import DropDownGroupSelector from '../Common/DropDownGroupSelector';
import Video from '../Video';
import DJBRGPTCard from '../Common/DJBRGPTCard';

type HeadlineSectionProps = {
  collecting: Agency[];
  recordAmount: number;
  paycheckAmount: number;
  finalValue: number;
  formatedStartDate: string;
  formatedEndDate: string;
  setOpenDialog: (isOpen: boolean) => void;
};

export default function HeadlineSection({
  collecting,
  recordAmount,
  paycheckAmount,
  finalValue,
  formatedStartDate,
  formatedEndDate,
  setOpenDialog,
}: HeadlineSectionProps) {
  const [videoURL, setVideoURL] = useState('fFyDINfubbc');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid
          item
          xs={12}
          md={7.5}
          gap={2}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h1" p={0} lineHeight={1.2}>
            Acesse as remunerações do sistema de Justiça
          </Typography>
          <Box>
            <Typography component="p" fontSize={18}>
              O DadosJusBr visa aumentar a transparência nas remunerações do
              sistema de Justiça brasileiro.
              <br />
              Coletamos dados de remunerações de{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {formatedStartDate}
              </span>{' '}
              até{' '}
              <span style={{ textTransform: 'lowercase' }}>
                {formatedEndDate}
              </span>{' '}
              diretamente dos respectivos portais de transparência e as
              disponibilizamos de maneira organizada e acessível.
            </Typography>
            <Typography component="p" fontSize={18}>
              Você pode fazer o{' '}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="always"
                onClick={() => setOpenDialog(true)}
                target="_blank"
                rel="noopener"
                sx={{ cursor: 'pointer' }}
              >
                <Typography
                  variant="inherit"
                  component="span"
                  color="success.main"
                >
                  download
                </Typography>
              </Link>{' '}
              de todas as informações de remunerações da nossa base de dados!
            </Typography>
          </Box>
          <Grid
            container
            display="flex"
            alignItems="flex-start"
            justifyContent={{ xs: 'center', md: 'space-evenly' }}
            mb={4}
            gap={2}
            pr={{ xs: 0, lg: 10 }}
          >
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  paddingY: 0.4,
                  bgcolor: '#31CBA3',
                  borderRadius: '12px',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#1f9c7a',
                  },
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <DropDownGroupSelector
                  isOpen={dropdownOpen}
                  setIsOpen={setDropdownOpen}
                  minWidth={125}
                  noStyle
                  faceText={
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        margin: '0 8px',
                        padding: '4px 0',
                      }}
                    >
                      Navegar pelos dados
                    </Typography>
                  }
                />
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="/pesquisar"
                variant="contained"
                sx={{
                  paddingX: '18px',
                  bgcolor: '#9e4a9c',
                  borderRadius: '12px',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#7a3f7d',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    margin: '0 8px',
                    padding: '4px 0',
                  }}
                >
                  Pesquisar
                </Typography>
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>

          <Box
            display="flex"
            flexWrap={{ xs: 'nowrap', md: 'wrap' }}
            overflow={{ xs: 'auto', md: 'hidden' }}
            justifyContent={{ xs: 'inherit', md: 'space-between' }}
            gap={2}
            mb={4}
          >
            <Link href="/status" style={{ textDecoration: 'none' }}>
              <StatsCard bgcolor="#445B6C">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="#31CBA3" variant="h2" p={0}>
                    {collecting.length}
                  </Typography>
                  <Apartment fontSize="large" />
                </Box>

                <Box>
                  <Typography variant="h3" p={0}>
                    Órgãos monitorados
                  </Typography>
                </Box>
              </StatsCard>
            </Link>

            <Link href="/pesquisar" style={{ textDecoration: 'none' }}>
              <StatsCard bgcolor="#F2F2F2">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="#c05dd1" variant="h2" p={0}>
                    {Number(paycheckAmount / 1000000).toLocaleString('pt-BR', {
                      style: 'decimal',
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                      compactDisplay: 'short',
                    })}
                    <span
                      style={{
                        marginLeft: '2px',
                        fontSize: '1.3rem',
                      }}
                    >
                      milhões
                    </span>
                  </Typography>
                  <ReceiptLongOutlined
                    fontSize="large"
                    sx={{
                      color: '#545454',
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="h3" color="#545454" p={0}>
                    Contracheques coletados
                  </Typography>
                </Box>
              </StatsCard>
            </Link>

            <Link
              href="#general-remuneration-section"
              style={{ textDecoration: 'none' }}
            >
              <StatsCard bgcolor="#445B6C">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="#FFDF7A" variant="h2" p={0}>
                    {Number(finalValue / 1000000000).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Typography>
                  <PaymentsOutlined fontSize="large" />
                </Box>

                <Box>
                  <Typography variant="h3" p={0}>
                    Bilhões em recursos públicos
                  </Typography>
                </Box>
              </StatsCard>
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          flexDirection={{ xs: 'column-reverse', md: 'column' }}
          alignItems={{ xs: 'center', md: 'inherit' }}
          justifyContent="space-between"
          gap={2}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Video.Player
              src={`https://www.youtube-nocookie.com/embed/${videoURL}`}
              loading="lazy"
              allowFullScreen
              aria-label="Vídeo sobre o Portal de Remunerações"
            />
            <Video.Related
              buttonProps={{
                sx: {
                  borderRadius: '12px',
                  padding: 0,
                  paddingX: 1,
                },
              }}
              setVideoURL={setVideoURL}
              relatedVideos={['TaQN-gLEV0Y', 'zDCiDV-IUR0']}
            />
          </Box>

          <DJBRGPTCard />
        </Grid>
      </Grid>
    </>
  );
}

const StatsCard = styled(Box)`
  border-radius: 18px;
  width: 215px;
  min-width: 215px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  cursor: pointer;
`;
