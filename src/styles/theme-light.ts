import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';

// Create a theme instance.
const theme = createTheme(
  {
    palette: {
      mode: 'light',
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
      warning: {
        main: '#f2ca4b',
      },
      background: {
        paper: '#f5f5f5',
        default: '#f5f5f5',
      },
    },
    typography: {
      fontFamily: "'Roboto Condensed', sans-serif",
      h1: {
        fontSize: '2.5rem',
        fontWeight: '700',
        paddingBottom: '1rem',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: '700',
        paddingBottom: '1rem',
      },
      h3: {
        fontSize: '1.4rem',
        fontWeight: '700',
        paddingBottom: '1rem',
      },
      body1: {
        paddingBottom: '0.5rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            borderWidth: '2px',
            textTransform: 'none',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            body1: 'p',
          },
        },
      },
    },
  },
  ptBR,
);

export default theme;
