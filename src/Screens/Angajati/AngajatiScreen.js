import React, { useContext } from 'react';
import { Store } from '../../Store';
import TabelAngajati from '../../components/Tables/TabelAngajati/TabelAngajati';
import { Button, Container, Link } from '@mui/material';
import { Box } from '@mui/system';
import ModalCreateAngajat from '../../components/Modals/Angajat/ModalCreateAngajat';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

ModalCreateAngajat.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AngajatiScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container disableGutters={useMediaQuery(theme.breakpoints.down('md'))}>
      <div>
        {userInfo && userInfo.isAdmin && mdUp ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(`/`)}
              >
                IQR
              </Link>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(`#`)}
              >
                Nomenclatoare
              </Link>
              <Typography>Angajati</Typography>
            </Breadcrumbs>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/angajatnou`)}
            >
              + Angajat nou{' '}
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'right',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/clientnou`)}
            >
              + Angajat nou
            </Button>
          </Box>
        )}{' '}
        <TabelAngajati />
      </div>
    </Container>
  );
}
