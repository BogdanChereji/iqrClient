import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Logo from '../images/Logo.svg';
function HomePageScreen() {
  return (
    <div>
      <Container>
        <Typography sx={{ mt: 3 }} variant="h4">
          Bun venit pe aplicația
        </Typography>
        <Box
          component="img"
          sx={{
            height: 100,
            mt: 3,
          }}
          alt="Your logo."
          src={Logo}
        />
      </Container>
    </div>
  );
}

export default HomePageScreen;
