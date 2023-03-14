import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Styles/Styles';
import {
  Paper,
  Box,
  FormControl,
  FormGroup,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import React, { useContext, useState, useReducer } from 'react';
import { Store } from '../../Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import axios from 'axios';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function CreateAngajati() {
  const [{ error, loading }, dispatch] = useReducer(reducer, {
    loading: '',
    error: '',
  });

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
  const navigate = useNavigate();

  //Functie creaza produs
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        'https://iqrserver.onrender.com/api/angajati',
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
      navigate(`/angajati`);
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container
          disableGutters
          sx={{
            mt: {
              md: 10, // theme.breakpoints.up('md')
              lg: 10, // theme.breakpoints.up('lg')
              xl: 10, // theme.breakpoints.up('xl')
            },
          }}
          maxWidth="sm"
        >
          <Paper>
            <Box
              sx={{
                backgroundColor: '#000041',
                color: '#fff',
                textAlign: 'left',
                padding: 2,
                paddingLeft: 3,
              }}
            >
              <Typography variant="h6">Înregistrează angajat nou</Typography>
            </Box>

            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <form onSubmit={createHandler}>
                <Box
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
                        label="Introduceți codul "
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
                        label="Introduceți numele"
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
                        label="Introduceți prenumele"
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
                        label="Introduceți telefonul"
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
                        label="Introduceți email-ul "
                        variant="outlined"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="adresa"
                        sx={{ mt: 2 }}
                        id="adresa"
                        label="Introduceți adresa"
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
                        label="Introduceți IBAN"
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
                        label="Introduceți banca"
                        variant="outlined"
                        required
                        onChange={(e) => setBanca(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/angajati`)}
                  sx={{ m: 2 }}
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ m: 2 }}
                >
                  Înregistrează
                </Button>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default CreateAngajati;
