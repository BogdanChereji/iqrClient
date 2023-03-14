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

export default function EditAngajati() {
  const params = useParams();
  const { id: angajatId } = params;
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  //Campuri
  const [nume, setNume] = useState('');
  const [codAngajat, setCodAngajat] = useState('');
  const [prenume, setPrenume] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [adresa, setAdresa] = useState('');
  const [iban, setIban] = useState('');
  const [banca, setBanca] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/angajati/${angajatId}`
        );
        setNume(data.nume);
        setCodAngajat(data.codAngajat);
        setPrenume(data.prenume);
        setTelefon(data.telefon);
        setEmail(data.email);
        setAdresa(data.adresa);
        setIban(data.iban);
        setBanca(data.banca);
        dispatch({ type: 'FETCH_SUCCES' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [angajatId]);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `https://iqrserver.onrender.com/api/angajati/${angajatId}`,
        {
          _id: angajatId,
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
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Înregistrarea a fost actualizată');
      navigate('/angajati');
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
          maxWidth="sm"
        >
          <Paper>
            <Box
              sx={{
                mb: 2,
                backgroundColor: '#000041',
                color: '#fff',
                textAlign: 'left',
                padding: 2,
                paddingLeft: 3,
              }}
            >
              <Typography variant="h6">Actualizează angajatul</Typography>
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
                        controlid="codAngajat"
                        sx={{ mt: 2 }}
                        id="codAngajat"
                        label="Introduceți codul "
                        variant="outlined"
                        required
                        value={codAngajat}
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
                        value={nume}
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
                        value={prenume}
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
                        value={telefon}
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
                        value={email}
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
                        value={adresa}
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
                        value={iban}
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
                        value={banca}
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
                  ACTUALIZEAZĂ
                </Button>
              </form>
            </Box>
          </Paper>
        </Container>
      )}
    </ThemeProvider>
  );
}
