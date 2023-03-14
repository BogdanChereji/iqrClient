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

function CreateClient() {
  const [{ error, loading }, dispatch] = useReducer(reducer, {
    loading: '',
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  //Campuri
  const [codClient, setCodClient] = useState('');
  const [numeClient, setNumeClient] = useState('');
  const [cifClient, setCifClient] = useState('');
  const [regcomClient, seRegcomClient] = useState('');
  const [tvaClient, setTvaClient] = useState('');
  const [adresaClient, setAdresaClient] = useState('');
  const [judetClient, setJudetClient] = useState('');
  const [localitateClient, setLocalitateClient] = useState('');
  const [contactClient, setContactClient] = useState('');
  const [ibanClient, setIbanClient] = useState('');
  const [bancaClient, setBancaClient] = useState('');
  const [telefonClient, setTelefonClient] = useState('');
  const [emailClient, setEmailClient] = useState('');

  //Functie creaza produs
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        'https://iqrserver.onrender.com/api/clienti',
        {
          codClient,
          numeClient,
          cifClient,
          regcomClient,
          tvaClient,
          adresaClient,
          localitateClient,
          judetClient,
          contactClient,
          ibanClient,
          bancaClient,
          telefonClient,
          emailClient,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('Înregistrarea a fost adăugată');
      dispatch({ type: 'CREATE_SUCCESS' });
      navigate(`/clienti`);
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
          maxWidth="md"
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
              <Typography variant="h6">Înregistrează client nou</Typography>
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
                        controlid="codClient"
                        sx={{ mt: 2 }}
                        id="codClient"
                        label="Introduceți codul "
                        variant="outlined"
                        required
                        onChange={(e) => setCodClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="numeClient"
                        sx={{ mt: 2 }}
                        id="numeClient"
                        label="Introduceți numele"
                        variant="outlined"
                        required
                        onChange={(e) => setNumeClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>

                    <FormGroup>
                      <TextField
                        controlid="telefonClient"
                        sx={{ mt: 2 }}
                        id="telefonClient"
                        label="Introduceți telefonul"
                        variant="outlined"
                        required
                        onChange={(e) => setTelefonClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="emailClient"
                        sx={{ mt: 2 }}
                        id="emailClient"
                        label="Introduceți email-ul"
                        variant="outlined"
                        required
                        onChange={(e) => setEmailClient(e.target.value)}
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
                    {' '}
                    <FormGroup>
                      <TextField
                        controlid="adresaClient"
                        sx={{ mt: 2 }}
                        id="adresaClient"
                        label="Introduceți adresa"
                        variant="outlined"
                        required
                        onChange={(e) => setAdresaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="judetClient"
                        sx={{ mt: 2 }}
                        id="judetClient"
                        label="Introduceți judetul"
                        variant="outlined"
                        required
                        onChange={(e) => setJudetClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="localitateClient"
                        sx={{ mt: 2 }}
                        id="localitateClient"
                        label="Introduceți localitatea"
                        variant="outlined"
                        required
                        onChange={(e) => setLocalitateClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>{' '}
                    <FormGroup>
                      <TextField
                        controlid="contactClient"
                        sx={{ mt: 2 }}
                        id="contactClient"
                        label="Introduceți contact-ul"
                        variant="outlined"
                        required
                        onChange={(e) => setContactClient(e.target.value)}
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
                        controlid="cifClient"
                        sx={{ mt: 2 }}
                        id="cifClient"
                        label="Introduceți CIF-ul "
                        variant="outlined"
                        required
                        onChange={(e) => setCifClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="regcomClient"
                        sx={{ mt: 2 }}
                        id="regcomClient"
                        label="Introduceți reg.com"
                        variant="outlined"
                        required
                        onChange={(e) => seRegcomClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="tvaClient"
                        sx={{ mt: 2 }}
                        id="tvaClient"
                        label="Introduceți TVA"
                        variant="outlined"
                        required
                        onChange={(e) => setTvaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="ibanClient"
                        sx={{ mt: 2 }}
                        id="ibanClient"
                        label="Introduceți iban-ul"
                        variant="outlined"
                        required
                        onChange={(e) => setIbanClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>{' '}
                    <FormGroup>
                      <TextField
                        controlid="bancaClient"
                        sx={{ mt: 2 }}
                        id="bancaClient"
                        label="Introduceți banca"
                        variant="outlined"
                        required
                        onChange={(e) => setBancaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/clienti`)}
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

export default CreateClient;
