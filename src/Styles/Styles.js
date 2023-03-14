import { createTheme } from '@mui/material/styles';

const Colors = {
  primary: '#000041',
  secondary: '#286da9',
  text: '#1f1f1f',
  background: '#EFEEF4',
  white: '#ffffff',
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
      contrastText: '#fff',
    },
    white: {
      main: Colors.white,
    },
    background: {
      default: Colors.background,
    },
  },

  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: Colors.primary,
          borderRight: 'none',
          color: Colors.white,
          width: 250,
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;
