import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import { getError } from '../../utils';
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
  Container,
} from '@mui/material';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { toast } from 'react-toastify';
import { display } from '@mui/system';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCES':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCES':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function EditClient() {
  const params = useParams();
  const { id: clientId } = params;
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/clienti/${clientId}`
        );
        setNumeClient(data.numeClient);
        setCodClient(data.codClient);
        setCifClient(data.cifClient);
        seRegcomClient(data.regcomClient);
        setTvaClient(data.tvaClient);
        setAdresaClient(data.adresaClient);
        setJudetClient(data.judetClient);
        setLocalitateClient(data.localitateClient);
        setContactClient(data.contactClient);
        setIbanClient(data.ibanClient);
        setBancaClient(data.bancaClient);
        setTelefonClient(data.telefonClient);
        setEmailClient(data.emailClient);
        dispatch({ type: 'FETCH_SUCCES' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [clientId]);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `https://iqrserver.onrender.com/api/clienti/${clientId}`,
        {
          _id: clientId,
          codClient,
          numeClient,
          cifClient,
          regcomClient,
          tvaClient,
          adresaClient,
          judetClient,
          localitateClient,
          ibanClient,
          contactClient,
          bancaClient,
          telefonClient,
          emailClient,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Înregistrarea a fost actualizată');
      navigate('/clienti');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
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
              <Typography variant="h6">Actualizează clientul</Typography>
            </Box>

            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <form onSubmit={updateHandler}>
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
                        value={codClient}
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
                        value={numeClient}
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
                        value={telefonClient}
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
                        value={emailClient}
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
                        value={adresaClient}
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
                        value={judetClient}
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
                        value={localitateClient}
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
                        value={contactClient}
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
                        value={cifClient}
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
                        value={regcomClient}
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
                        value={tvaClient}
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
                        value={ibanClient}
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
                        value={bancaClient}
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
                  Actualizează
                </Button>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </ThemeProvider>
  );
}
