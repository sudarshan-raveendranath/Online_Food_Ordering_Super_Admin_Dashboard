import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => 
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#1976d2',
            },
            secondary: {
              main: '#9c27b0',
            },
          }
        : {
            primary: {
              main: '#90caf9',
            },
            secondary: {
              main: '#ce93d8',
            },
            background: {
              default: '#121212',
              paper: '#1d1d1d',
            },
          }),
    },
  });
