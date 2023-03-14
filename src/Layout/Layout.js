import React from 'react';
import { LayoutStyle } from './LayoutStyle';
import Drawer from '../Nav/Drawer/Drawer';
import Box from '@mui/material/Box';
import { Container } from '@material-ui/core';

function Layout({ children }) {
  const classes = LayoutStyle();

  return (
    <div className={classes.root}>
      <Drawer />
      <Container>
        <Box>
          <main>
            <div className={classes.topbarWidth} />
            {children}
          </main>
        </Box>
      </Container>
    </div>
  );
}

export default Layout;
