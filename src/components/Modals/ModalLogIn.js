import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormGroup, TextField } from '@mui/material';
import Axios from 'axios';
import { useContext, useState } from 'react';
import { Store } from '../../Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getError } from '../../utils';

function ModalLogIn(props) {
  const [valueTabs, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { onClose, open } = props;
  const handleClose = () => {
    onClose(onClose);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { dispatch: ctxDispatch } = useContext(Store);
  const submitHandlerSignIn = async (e) => {
    handleClose();
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        'https://iqrserver.onrender.com/api/users/signin',
        {
          email,
          password,
        }
      );
      toast.success('Te-ai conectat cu succes');
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const submitHandlerSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Parolele nu se potrivesc');
      return;
    }
    try {
      const { data } = await Axios.post(
        'https://iqrserver.onrender.com/api/users/signup',
        {
          name,
          email,
          password,
        }
      );
      toast.success('Te-ai înregistrat cu succes');
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <TabContext value={valueTabs}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Conectează-te" value="1" />
              <Tab label="Crează un cont" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form onSubmit={submitHandlerSignIn}>
              <DialogContent>
                <Box>
                  <FormGroup>
                    {' '}
                    <TextField
                      controlid="email"
                      sx={{ mt: 2 }}
                      id="outlined-basic-email"
                      label="Introduceți email-ul"
                      variant="outlined"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl type="email" required />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      controlid="password"
                      sx={{ mt: 2 }}
                      id="outlined-basic-pass"
                      label="Introduceți parola"
                      variant="outlined"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControl type="password" required />
                  </FormGroup>
                </Box>
              </DialogContent>

              <DialogActions>
                <FormGroup>
                  <Button type="submit" sx={{ m: 'auto' }} autoFocus>
                    Conectează-te
                  </Button>
                </FormGroup>
              </DialogActions>
            </form>
          </TabPanel>
          <TabPanel value="2">
            {' '}
            <form onSubmit={submitHandlerSignUp}>
              <DialogContent>
                <Box>
                  <FormGroup>
                    <TextField
                      controlid="name"
                      sx={{ mt: 2 }}
                      id="outlined-basic-name"
                      label="Introduceți numele"
                      variant="outlined"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl required />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      controlid="email"
                      sx={{ mt: 2 }}
                      id="outlined-basic-email"
                      label="Introduceți email-ul"
                      variant="outlined"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl type="email" required />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      controlid="password"
                      sx={{ mt: 2 }}
                      id="outlined-basic-pass"
                      label="Introduceți parola"
                      variant="outlined"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControl type="password" required />
                  </FormGroup>
                  <FormGroup>
                    <TextField
                      controlid="confirmPassword"
                      sx={{ mt: 2 }}
                      id="outlined-basic-confirm"
                      label="Confirmați parola"
                      variant="outlined"
                      type="password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FormControl type="password" required />
                  </FormGroup>
                </Box>
              </DialogContent>

              <DialogActions>
                <FormGroup>
                  <Button
                    type="submit"
                    onClick={handleClose}
                    sx={{ m: 'auto' }}
                    autoFocus
                  >
                    Înregistrează-te
                  </Button>
                </FormGroup>
              </DialogActions>
            </form>
          </TabPanel>
        </TabContext>
      </Dialog>
    </div>
  );
}

export default ModalLogIn;
