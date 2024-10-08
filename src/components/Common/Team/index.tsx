import { useState } from 'react';
import styled from 'styled-components';

import { Box, Container, Grid, Button, Typography, Link } from '@mui/material';

export default function Team() {
  const [teamMates] = useState([
    {
      id: 1,
      name: 'Bianca Berti',
      role: 'Analista de transparência e integridade',
      profileURL: 'https://www.linkedin.com/in/bertibianca/',
      photoURL:
        'https://www.transparencia.org.br/uploads/quemsomos/bberti.jpeg',
    },
    {
      id: 2,
      name: 'Daniel Fireman',
      role: 'Líder técnico',
      profileURL: 'https://github.com/danielfireman',
      photoURL:
        'https://avatars2.githubusercontent.com/u/8951363?s=400&u=acdedbbd00a15d2f913e3e1bde6b14f2c7451f90&v=4',
    },
    {
      id: 3,
      name: 'Jessé Oliveira',
      role: 'Desenvolvedor',
      profileURL: 'https://github.com/jezzdiego',
      photoURL: 'https://github.com/jezzdiego.png',
    },
    {
      id: 4,
      name: 'Joellen Silva',
      role: 'Desenvolvedora',
      profileURL: 'https://github.com/Joellensilva',
      photoURL: 'https://github.com/Joellensilva.png',
    },
    {
      id: 5,
      name: 'Juliana Sakai',
      role: 'Lider',
      profileURL: 'https://www.linkedin.com/in/julianasakai/',
      photoURL: '/img/team/ju_sakai.jpg',
    },
    {
      id: 6,
      name: 'Cristiano Pavini',
      role: 'Coordenador de projetos',
      profileURL: 'https://www.linkedin.com/in/cristiano-pavini-4286303b/',
      photoURL: '/img/team/C.Pavini.jpeg',
    },
    {
      id: 7,
      name: 'Nazareno Andrade',
      role: 'Professor',
      profileURL: 'https://github.com/nazareno',
      photoURL: 'https://github.com/nazareno.png',
    },
    {
      id: 8,
      name: 'Raul Durlo',
      role: 'Cientista de Dados',
      profileURL: 'https://github.com/rdurl0',
      photoURL: 'https://github.com/rdurl0.png',
    },
  ]);

  const [contribuitors] = useState([
    {
      id: 1,
      name: 'TB',
      img: '/img/team/logo_transparencia_brasil.svg',
    },
    {
      id: 2,
      name: 'UFCG',
      img: '/img/team/logo_ufcg.svg',
    },
    {
      id: 3,
      name: 'IFAL',
      img: '/img/partners/IFAL.svg',
    },
  ]);
  return (
    <Page>
      <Box py={4}>
        <Container fixed>
          <Typography variant="h1" textAlign="center" gutterBottom>
            Equipe
          </Typography>
          <Grid container spacing={8}>
            {teamMates.map(teamMate => (
              <Grid item key={teamMate.id} xs={6} sm={4} md={3}>
                <Link href={teamMate.profileURL}>
                  <TeamAvatar
                    src={teamMate.photoURL}
                    alt={teamMate.name}
                    width="100%"
                  />
                </Link>
                <Typography variant="h5" textAlign="center">
                  {teamMate.name}
                </Typography>
                <Typography textAlign="center">{teamMate.role}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box py={12}>
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <h2>SE INTERESSOU? QUER AJUDAR?</h2>
              <p>
                O sistema de justiça brasileiro é composto por uma grande
                quantidade de órgãos federais e estaduais distribuídos por todo
                o território nacional.
              </p>
              <p>
                Por isso, precisamos de contribuidores para criar crawlers e
                parsers para alimentar nossa base de dados.
              </p>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="outlined"
                size="large"
                color="info"
                href="https://github.com/dadosjusbr/coletores"
                target="_blank"
              >
                Saiba mais aqui
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={4}>
        <Container fixed>
          <Typography variant="h2" textAlign="center" gutterBottom>
            Financiador
          </Typography>
          <Grid container spacing={2} display="flex" justifyContent="center">
            <Grid item xs={6} sm={4} md={3}>
              <img src="/img/partners/IBEJL.svg" alt="IBEJL" width="100%" />
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant="h2" textAlign="center" gutterBottom>
              Realização
            </Typography>
            <Grid container spacing={2} display="flex" justifyContent="center">
              {contribuitors.map(c => (
                <Grid
                  key={c.id}
                  item
                  xs={4}
                  md={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Partner src={c.img} alt={c.name} width="100%" />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
const Page = styled.div`
  background: #3e5363;
`;

const TeamAvatar = styled.img`
  border-radius: 50%;
  filter: grayscale(100%);
  padding: 1rem;
`;

const Partner = styled.img`
  filter: brightness(0) invert(1);
`;
