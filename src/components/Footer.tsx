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
      <Grid container columnSpacing={4} display="flex" justifyContent="center">
        <Grid item xs={5} sm={4} md={2}>
          <img
            src={
              theme === 'DEFAULT'
                ? '/img/footer/icon_dadosjusbr_dafault.svg'
                : '/img/footer/icon_dadosjusbr_light.svg'
            }
            width="100%"
            alt="DadosjusBR"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <p>
            Alguma dica? Tem algum feedback geral? Se você tiver uma ideia que
            você gostaria de ver no DadosJusBr, envie-nos um e-mail{' '}
            <Link
              color="inherit"
              underline="hover"
              href="mailto:dadosjusbr@gmail.com"
            >
              dadosjusbr@gmail.com
            </Link>{' '}
            ou visite nosso{' '}
            <Link
              color="inherit"
              underline="hover"
              href="https://github.com/dadosjusbr/"
              target="_blank"
              rel="noopener"
            >
              github
            </Link>
            .
          </p>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Footer;
