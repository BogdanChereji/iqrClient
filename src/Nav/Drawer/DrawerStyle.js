import { makeStyles } from '@material-ui/core';

export const DrawerStyle = makeStyles((theme) => ({
  active: {
    backgroundColor: '#286da9',
    borderBottom: '1px solid #2f8f90',
    color: '#ffffff',
  },

  buttonHeader: {
    backgroundColor: '#286da9 !important',
    color: 'white !important',
    fontWeight: 'medium !important',
  },
  buttonText: {
    color: 'white !important',
    fontWeight: 'medium !important',
  },
}));
