import { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Link,
  Button,
  Drawer,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const [pages] = useState([
    {
      key: 'inicio',
      title: 'Início',
      anchor: '/',
    },
    {
      key: 'indice',
      title: 'Índice',
      anchor: '/indice',
    },
    {
      key: 'namidia',
      title: 'Na mídia',
      anchor: '/namidia',
    },
    {
      key: 'equipe',
      title: 'Equipe',
      anchor: '/equipe',
    },
    {
      key: 'status',
      title: 'Status',
      anchor: '/status',
    },
    {
      key: 'sobre',
      title: 'Sobre',
      anchor: '/sobre',
    },
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);

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
          <Grid item xs={4} md={2}>
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
            xs={8}
            md={10}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box pt={4} sx={{ width: 250 }}>
          <List>
            {pages.map(page => (
              <ListItem key={page.key} disablePadding>
                <ListItemButton component="a" href={page.anchor}>
                  <ListItemText primary={page.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Container>
  );
}

export default Header;
