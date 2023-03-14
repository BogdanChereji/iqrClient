import { makeStyles } from '@material-ui/core';

export const LayoutStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  topbarWidth: theme.mixins.toolbar,
}));
