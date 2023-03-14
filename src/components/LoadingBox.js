import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Styles/Styles';

export default function LoadingBox() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', color: 'grey.500' }}>
        <CircularProgress color="secondary" />
      </Box>{' '}
    </ThemeProvider>
  );
}
