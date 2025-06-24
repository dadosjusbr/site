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
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DropDownGroupSelector from '../Common/DropDownGroupSelector';

function Header() {
  const [pages] = useState([
    {
      key: 'grupo',
      title: 'Grupos',
      anchor: 'dropdown',
    },
    {
      key: 'pesquisa',
      title: 'Pesquisar',
      anchor: '/pesquisar',
    },
    {
      key: 'indice',
      title: 'Índice de Transparência',
      anchor: '/indice',
    },
    {
      key: 'status',
      title: 'Status',
      anchor: '/status',
    },
    {
      key: 'relatorios',
      title: 'Relatórios',
      anchor: '/relatorios',
    },
    {
      key: 'tutoriais',
      title: 'Tutoriais',
      anchor: '/tutoriais',
    },
    // {
    //   key: 'namidia',
    //   title: 'Na Mídia',
    //   anchor: '/namidia',
    // },
    {
      key: 'quemsomos',
      title: 'Quem Somos',
      anchor: '/sobre',
    },
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Container fixed>
      <Box
        sx={{
          borderBottom: '2px solid',
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid item xs={4} md={2}>
            <Link href="/">
              <img
                src="/img/header/icon_dadosjusbr_default.svg"
                width="130"
                height="108"
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
            mt={4}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {pages.map(page =>
                page.anchor === 'dropdown' ? (
                  <DropDownGroupSelector
                    key={page.key}
                    noStyle
                    minWidth={50}
                    maxWidth={200}
                  />
                ) : (
                  <Button
                    key={page.key}
                    variant="text"
                    color="info"
                    size="large"
                    href={page.anchor}
                  >
                    <Typography>{page.title}</Typography>
                  </Button>
                ),
              )}
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
            {pages.map(page =>
              page.anchor === 'dropdown' ? (
                <DropDownGroupSelector
                  key={page.key}
                  noStyle
                  minWidth={50}
                  maxWidth={200}
                />
              ) : (
                <ListItem key={page.key} disablePadding>
                  <ListItemButton component="a" href={page.anchor}>
                    <ListItemText primary={page.title} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
        </Box>
      </Drawer>
    </Container>
  );
}

export default Header;
