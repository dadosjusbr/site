import { HTMLAttributes } from 'react';

import { Container, Box, Grid, Link } from '@mui/material';

// The footer is a component that appears at various times in the application
// It consists of DadosJus logo and a message for contact.
export interface FooterPropos extends HTMLAttributes<HTMLDivElement> {
  theme?: 'DEFAULT' | 'LIGHT';
}

const Footer: React.FC<FooterPropos> = ({ theme = 'DEFAULT' }) => (
  <Container fixed>
    <Box
      p={4}
      sx={{
        borderTop: '2px solid',
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 0, sm: 2, md: 4 }}
        display="flex"
        justifyContent={{ xs: 'center', sm: 'center', md: 'space-between' }}
      >
        <Grid item xs={5} sm={4} md={2}>
          <img
            src={
              theme === 'DEFAULT'
                ? '/img/footer/icon_dadosjusbr_dafault.svg'
                : '/img/footer/icon_dadosjusbr_light.svg'
            }
            width="130"
            height="108"
            alt="DadosjusBR"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={7} textAlign="center">
          <p>
            Para dúvidas e sugestões, envie uma mensagem para{' '}
            <Link
              color="inherit"
              underline="hover"
              href="mailto:contato@dadosjusbr.org"
            >
              contato@dadosjusbr.org
            </Link>
            , ou visite nosso{' '}
            <Link
              color="inherit"
              underline="hover"
              href="https://github.com/dadosjusbr/"
              target="_blank"
              rel="noopener"
            >
              Github
            </Link>
            .
          </p>
        </Grid>
        <Grid item xs={9} sm={6.5} md={2.5}>
          <img
            src="/img/team/logo_transparencia_brasil.svg"
            width="200"
            // height="108"
            alt="DadosjusBR"
            style={{
              filter: 'brightness(0) invert(1)',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Footer;
