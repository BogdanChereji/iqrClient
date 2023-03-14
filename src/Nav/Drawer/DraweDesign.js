import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Collapse from '@mui/material/Collapse';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Toolbar from '@mui/material/Toolbar';
import { DrawerStyle } from './DrawerStyle';
import BusinessIcon from '@mui/icons-material/Business';
import TaskIcon from '@mui/icons-material/Task';
import PowerIcon from '@mui/icons-material/Power';
import InventoryIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import React, { useContext } from 'react';
import { Store } from '../../Store';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SummarizeIcon from '@mui/icons-material/Summarize';

function DrawerDesign() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const classes = DrawerStyle();
  const [openNomenclator, setOpenNomenclator] = React.useState(false);
  const handleClickNomenclator = () => {
    setOpenNomenclator(!openNomenclator);
  };
  const [openRapoarte, setOpenRapoarte] = React.useState(false);
  const handleClickRapoarte = () => {
    setOpenRapoarte(!openRapoarte);
  };

  return (
    <div>
      <Toolbar> Meniu de navigare</Toolbar>
      <List dense>
        {/* Dashboard */}
        <ListItem
          sx={{
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          disableGutters
          onClick={() => navigate('/')}
          className={
            location.pathname === '/' ? classes.active : classes.notactive
          }
        >
          <ListItemButton dense>
            <ListItemIcon>
              <DashboardIcon color="white" />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>

        {/* Interfata angajat */}

        <ListItem
          sx={{
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          disableGutters
          onClick={() => navigate('/interfata')}
          className={
            location.pathname === '/interfata'
              ? classes.active
              : classes.notactive
          }
        >
          <ListItemButton dense>
            <ListItemIcon>
              <BadgeIcon color="white" />
            </ListItemIcon>
            <ListItemText primary={'Interfață angajat'} />
          </ListItemButton>
        </ListItem>

        {/* Nomenclatoare */}

        <ListItemButton
          sx={{
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          dense
          onClick={handleClickNomenclator}
        >
          <ListItemIcon>
            <FormatListBulletedIcon color="white" />
          </ListItemIcon>
          <ListItemText primary="Nomenclatoare" />
          {openNomenclator ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Lista nomenclator */}

        <Collapse in={openNomenclator} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            <ListItem
              sx={{
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              className={
                location.pathname === '/angajati'
                  ? classes.active
                  : classes.notactive
              }
            >
              <ListItemButton
                dense
                sx={{ pl: 4 }}
                onClick={() => navigate('/angajati')}
              >
                <ListItemIcon>
                  <PeopleIcon color="white" />
                </ListItemIcon>
                <ListItemText primary="Angajati" />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              className={
                location.pathname === '/clienti'
                  ? classes.active
                  : classes.notactive
              }
            >
              <ListItemButton
                dense
                sx={{ pl: 4 }}
                onClick={() => navigate('/clienti')}
              >
                <ListItemIcon>
                  <BusinessIcon color="white" />
                </ListItemIcon>
                <ListItemText primary="Clienti" />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              className={
                location.pathname === '/servicii'
                  ? classes.active
                  : classes.notactive
              }
            >
              <ListItemButton
                dense
                sx={{ pl: 4 }}
                onClick={() => navigate('/servicii')}
              >
                <ListItemIcon>
                  <TaskIcon color="white" />
                </ListItemIcon>
                <ListItemText primary="Servicii" />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              className={
                location.pathname === '/echipamente'
                  ? classes.active
                  : classes.notactive
              }
            >
              <ListItemButton
                dense
                sx={{ pl: 4 }}
                onClick={() => navigate('/echipamente')}
              >
                <ListItemIcon>
                  <PowerIcon color="white" />
                </ListItemIcon>
                <ListItemText primary="Echipamente" />
              </ListItemButton>
            </ListItem>
            <ListItem
              sx={{
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              className={
                location.pathname === '/stocuri'
                  ? classes.active
                  : classes.notactive
              }
            >
              <ListItemButton
                disabled
                dense
                sx={{ pl: 4 }}
                onClick={() => navigate('/stocuri')}
              >
                <ListItemIcon>
                  <InventoryIcon color="white" />
                </ListItemIcon>
                <ListItemText primary="Stocuri" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Rapoarte angajati */}
        {userInfo && userInfo.isAdmin && (
          <ListItemButton
            sx={{
              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            dense
            onClick={handleClickRapoarte}
          >
            <ListItemIcon>
              <AssessmentIcon color="white" />
            </ListItemIcon>
            <ListItemText primary="Rapoarte angajați" />
            {openNomenclator ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
        {/* Lista rapoarte angajati */}
        {userInfo && userInfo.isAdmin && (
          <Collapse in={openRapoarte} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem
                sx={{
                  '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                className={
                  location.pathname === '/pontaje'
                    ? classes.active
                    : classes.notactive
                }
              >
                <ListItemButton
                  dense
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/pontaje')}
                >
                  <ListItemIcon>
                    <SummarizeIcon color="white" />
                  </ListItemIcon>
                  <ListItemText primary="Pontaje" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        )}
      </List>
    </div>
  );
}

export default DrawerDesign;
