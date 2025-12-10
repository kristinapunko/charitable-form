import { createTheme } from '@mui/material/styles';
const GEOMETRIA_FONT = 'var(--font-geometria)';
const GILROY_FONT = 'var(--font-gilroy)';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    error: {
      main: '#e74c3c',
    },
    darkText: {
      main: '#2c3e50',
    },
    lightText: {
      main: '#7f8c8d',
    },
    lightBackground: {
      main: '#f5f7f9', 
    },
    lightBorder: {
      main: '#b3c3e7',
    },
    customGradient: {
      start: '#ff4b5c', 
      end: '#8b5fb5',
  },
  },
  typography: {
    fontFamily: GEOMETRIA_FONT,

    h1: {
      fontFamily: GILROY_FONT,
      fontWeight: 800,
    },
    h2: {
      fontFamily: GILROY_FONT,
      fontWeight: 800,
      fontSize: '3.7rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: GILROY_FONT,
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h6: {
      fontFamily: GEOMETRIA_FONT,
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: GEOMETRIA_FONT,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.3s ease',
          fontFamily: GEOMETRIA_FONT,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});