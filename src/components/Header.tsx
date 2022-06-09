import { useState } from 'react';
import { Container, Box, Grid, Link, Button } from '@mui/material';

function Header() {
  const [pages] = useState([
    {
      key: 'inicio',
      title: 'Início',
      anchor: '/',
    },
    {
      key: 'equipe',
      title: 'Equipe',
      anchor: '/equipe',
    },
    {
      key: 'namidia',
      title: 'Na mídia',
      anchor: '/namidia',
    },
    {
      key: 'sobre',
      title: 'Sobre',
      anchor: '/sobre',
    },
  ]);
  return (
    <Container fixed>
      <Box
        p={4}
        sx={{
          borderBottom: '2px solid',
        }}
      >
        <Grid
          container
          columnSpacing={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3} md={2}>
            <Link href="/">
              <img
                src="/img/header/icon_dadosjusbr_default.svg"
                width="80%"
                alt="DadosjusBR"
              />
            </Link>
          </Grid>
          <Grid
            item
            xs={9}
            md={10}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            {pages.map(page => (
              <Button
                key={page.key}
                variant="text"
                color="info"
                size="large"
                href={page.anchor}
              >
                {page.title}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Header;
