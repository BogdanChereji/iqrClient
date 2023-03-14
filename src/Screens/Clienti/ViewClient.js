import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
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

function ViewClient() {
  const params = useParams();
  const { numeClient } = params;
  const [{ loading, error, client }, dispatch] = useReducer(reducer, {
    client: [],
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  //Campuri
  const [codClient, setCodClient] = useState('');
  const [numeClienta, setNumeClient] = useState('');
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
          `https://iqrserver.onrender.com/api/clienti/nume/${numeClient}`
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
  }, [numeClient]);

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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Detalii client</Typography>{' '}
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/clienti`)}
              >
                Înapoi
              </Button>
            </Box>

            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <form>
                <Box
                  sx={{
                    mb: 2,
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
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="codClient"
                        sx={{ mt: 2 }}
                        id="codClient"
                        label="Cod client "
                        variant="outlined"
                        value={codClient}
                        onChange={(e) => setCodClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="numeClient"
                        sx={{ mt: 2 }}
                        id="numeClient"
                        label="Numele"
                        variant="outlined"
                        value={numeClienta}
                        onChange={(e) => setNumeClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>

                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="telefonClient"
                        sx={{ mt: 2 }}
                        id="telefonClient"
                        label="Telefon"
                        variant="outlined"
                        value={telefonClient}
                        onChange={(e) => setTelefonClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="emailClient"
                        sx={{ mt: 2 }}
                        id="emailClient"
                        label="Email"
                        variant="outlined"
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
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="adresaClient"
                        sx={{ mt: 2 }}
                        id="adresaClient"
                        label="Adresa"
                        variant="outlined"
                        value={adresaClient}
                        onChange={(e) => setAdresaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="judetClient"
                        sx={{ mt: 2 }}
                        id="judetClient"
                        label="Judetul"
                        variant="outlined"
                        value={judetClient}
                        onChange={(e) => setJudetClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="localitateClient"
                        sx={{ mt: 2 }}
                        id="localitateClient"
                        label="Localitatea"
                        variant="outlined"
                        value={localitateClient}
                        onChange={(e) => setLocalitateClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>{' '}
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="contactClient"
                        sx={{ mt: 2 }}
                        id="contactClient"
                        label="Persoană de contact"
                        variant="outlined"
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
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="cifClient"
                        sx={{ mt: 2 }}
                        id="cifClient"
                        label="CIF"
                        variant="outlined"
                        value={cifClient}
                        onChange={(e) => setCifClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="regcomClient"
                        sx={{ mt: 2 }}
                        id="regcomClient"
                        label="Registru Comerțului"
                        variant="outlined"
                        value={regcomClient}
                        onChange={(e) => seRegcomClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="tvaClient"
                        sx={{ mt: 2 }}
                        id="tvaClient"
                        label="Plătitor de TVA"
                        variant="outlined"
                        value={tvaClient}
                        onChange={(e) => setTvaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="ibanClient"
                        sx={{ mt: 2 }}
                        id="ibanClient"
                        label="Iban"
                        variant="outlined"
                        value={ibanClient}
                        onChange={(e) => setIbanClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>{' '}
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="bancaClient"
                        sx={{ mt: 2 }}
                        id="bancaClient"
                        label="Bancă"
                        variant="outlined"
                        value={bancaClient}
                        onChange={(e) => setBancaClient(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default ViewClient;
