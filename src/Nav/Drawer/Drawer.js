import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Styles/Styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DrawerStyle } from './DrawerStyle';
import { Button } from '@material-ui/core';
import ModalLogIn from '../../components/Modals/ModalLogIn';
import { useContext } from 'react';
import { Store } from '../../Store';
import DrawerDesign from './DraweDesign';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const drawerWidth = 240;

ModalLogIn.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function ResponsiveDrawer(props) {
  const classes = DrawerStyle();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleClose = (value) => {
    setOpenModal(false);
  };

  //SignIn Store/SignOut
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          elevation={0}
          color="primary"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ mr: 'auto' }} variant="h6" noWrap component="div">
              IQR.ro{' '}
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 'auto' }}>
              <Typography>
                Această aplicație este dezvoltată de către BMD Media
              </Typography>
            </Box>

            {userInfo ? (
              <Toolbar>
                <Button
                  className={classes.buttonHeader}
                  variant="text"
                  onClick={handleMenu}
                >
                  Bun venit, {userInfo.name}!
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseProfile}
                >
                  <MenuItem onClick={(handleCloseProfile, signoutHandler)}>
                    Deconectează-te
                  </MenuItem>
                </Menu>
              </Toolbar>
            ) : (
              <Button
                disableElevation
                className={classes.buttonHeader}
                variant="contained"
                onClick={handleClickOpen}
              >
                Loghează-te!{' '}
              </Button>
            )}
            <ModalLogIn open={openModal} onClose={handleClose} />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawerPaper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <DrawerDesign />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawerPaper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <DrawerDesign />
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
