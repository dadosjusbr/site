import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    h1: {
      fontFamily: "'Rowdies', sans-serif",
    },
  },
});

export default theme;
