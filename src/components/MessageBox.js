import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Styles/Styles';
import { Stack } from '@mui/material';

export default function MessageBox(props) {
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Box sx={{ display: 'flex', color: 'grey.500' }}>
          <Alert variant="filled" severity="error">
            {props.children}
          </Alert>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
