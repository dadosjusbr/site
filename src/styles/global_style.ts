import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7f3d8b',
    },
    secondary: {
      main: '#3e5363',
    },
    info: {
      main: '#ffffff',
    },
    success: {
      main: '#3edbb1',
    },
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '700',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: '2px',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
