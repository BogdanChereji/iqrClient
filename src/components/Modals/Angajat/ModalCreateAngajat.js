import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  DialogTitle,
  FormControl,
  FormGroup,
  IconButton,
  TextField,
} from '@mui/material';
import { useContext, useState, useReducer } from 'react';
import { Store } from '../../../Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getError } from '../../../utils';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

function ModalCreateAngajat(props) {
  const [{ error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const reload = () => window.location.reload();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  //Modal

  const { onClose, open } = props;
  const handleClose = () => {
    onClose(onClose);
    reload();
  };

  const { state } = useContext(Store);
  const { userInfo } = state;

  //Campuri
  const [nume, setNume] = useState('');
  const [codAngajat, setCodAngajat] = useState('');
  const [prenume, setPrenume] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [adresa, setAdresa] = useState('');
  const [iban, setIban] = useState('');
  const [banca, setBanca] = useState('');

  //Functie creaza produs
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/angajati',
        {
          codAngajat,
          nume,
          prenume,
          telefon,
          email,
          adresa,
          iban,
          banca,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Înregistrarea a fost adăugată');
      dispatch({ type: 'CREATE_SUCCESS' });
      handleClose();
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'CREATE_FAIL',
      });
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
        <form onSubmit={createHandler}>
          <DialogTitle sx={{ textAlign: 'Right' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              display: {
                md: 'flex', // theme.breakpoints.up('md')
                lg: 'flex', // theme.breakpoints.up('lg')
                xl: 'flex', // theme.breakpoints.up('xl')
              },
            }}
          >
            <Box
              sx={{
                m: {
                  md: 1, // theme.breakpoints.up('md')
                  lg: 1, // theme.breakpoints.up('lg')
                  xl: 1, // theme.breakpoints.up('xl')
                },
              }}
            >
              <FormGroup>
                <TextField
                  controlid="codAngajat"
                  sx={{ mt: 2 }}
                  id="codAngajat"
                  label="Introduceți codul de angajat"
                  variant="outlined"
                  required
                  onChange={(e) => setCodAngajat(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="nume"
                  sx={{ mt: 2 }}
                  id="nume"
                  label="Introduceți numele angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setNume(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="prenume"
                  sx={{ mt: 2 }}
                  id="prenume"
                  label="Introduceți prenumele angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setPrenume(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="telefon"
                  sx={{ mt: 2 }}
                  id="telefon"
                  label="Introduceți telefonul angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setTelefon(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
            </Box>
            <Box
              sx={{
                m: {
                  md: 1, // theme.breakpoints.up('md')
                  lg: 1, // theme.breakpoints.up('lg')
                  xl: 1, // theme.breakpoints.up('xl')
                },
              }}
            >
              <FormGroup>
                <TextField
                  controlid="email"
                  sx={{ mt: 2 }}
                  id="email"
                  label="Introduceți email-ul angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl type="email" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="adresa"
                  sx={{ mt: 2 }}
                  id="adresa"
                  label="Introduceți adresa angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setAdresa(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="iban"
                  sx={{ mt: 2 }}
                  id="iban"
                  label="Introduceți ibanul angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setIban(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
              <FormGroup>
                <TextField
                  controlid="banca"
                  sx={{ mt: 2 }}
                  id="banca"
                  label="Introduceți banca angajatului"
                  variant="outlined"
                  required
                  onChange={(e) => setBanca(e.target.value)}
                />
                <FormControl type="text" required />
              </FormGroup>
            </Box>
          </DialogContent>
          <DialogActions>
            <FormGroup>
              <Button type="submit" sx={{ m: 'auto' }} autoFocus>
                Adaugă angajatul{' '}
              </Button>
            </FormGroup>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ModalCreateAngajat;
