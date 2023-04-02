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
  Select,
} from '@mui/material';
import React, { useContext, useState, useEffect, useReducer } from 'react';
import { Store } from '../../Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import axios from 'axios';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS_ANGAJATI':
      return { ...state, angajati: action.payload, loading: false };
    case 'FETCH_SUCCESS_CLIENTI':
      return { ...state, clienti: action.payload, loading: false };
    case 'FETCH_SUCCESS_SERVICII':
      return { ...state, servicii: action.payload, loading: false };
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

function CreatePontaj() {
  const [{ angajati, clienti, servicii, error, loading }, dispatch] =
    useReducer(reducer, {
      loading: '',
      error: '',
      angajati: [],
      clienti: [],
      servicii: [],
    });

  const params = useParams();
  const { id: pontajId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  //Campuri
  const [numeAngajat, setNumeAngajat] = useState('');
  const [data, setData] = useState('');
  const [ziua, setZiua] = useState('');
  const [denumireClient, setDenumireClient] = useState('');
  const [denumireServiciu, setDenumireServiciu] = useState('');
  const [timp, setTimp] = useState('');
  const [distanta, setDistanta] = useState('');
  const [comentariu, setComentariu] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/pontaje/${pontajId}`
        );
        setNumeAngajat(data.numeAngajat);
        setData(data.data);
        setZiua(data.ziua);
        setDenumireClient(data.denumireClient);
        setDenumireServiciu(data.denumireServiciu);
        setTimp(data.timp);
        setDistanta(data.distanta);
        setComentariu(data.comentariu);
        dispatch({ type: 'FETCH_SUCCES' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [pontajId]);

  useEffect(() => {
    const fetchAngajati = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/angajati `,
          {}
        );

        dispatch({ type: 'FETCH_SUCCESS_ANGAJATI', payload: data });
      } catch (err) {}
    };

    fetchAngajati();
  }, []);

  useEffect(() => {
    const fetchClienti = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/clienti `,
          {}
        );

        dispatch({ type: 'FETCH_SUCCESS_CLIENTI', payload: data });
      } catch (err) {}
    };

    fetchClienti();
  }, []);

  useEffect(() => {
    const fetchServicii = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/servici `,
          {}
        );

        dispatch({ type: 'FETCH_SUCCESS_SERVICII', payload: data });
      } catch (err) {}
    };

    fetchServicii();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `https://iqrserver.onrender.com/api/pontaje/${pontajId}`,
        {
          _id: pontajId,
          numeAngajat,
          data,
          ziua,
          denumireClient,
          denumireServiciu,
          timp,
          distanta,
          comentariu,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Înregistrarea a fost actualizată');
      navigate('/interfata');
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
                backgroundColor: '#000041',
                color: '#fff',
                textAlign: 'left',
                padding: 2,
                paddingLeft: 3,
              }}
            >
              <Typography variant="h6">Înregistrează pontaj nou</Typography>
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
                    <FormControl required sx={{ mt: 2, width: '100%' }}>
                      <InputLabel id="numeAngajat">Alege angajat</InputLabel>
                      <Select
                        labelId="numeAngajat"
                        id="numeAngajat"
                        label="Alege angajat*"
                        value={numeAngajat}
                        onChange={(e) => setNumeAngajat(e.target.value)}
                      >
                        <MenuItem>
                          <em>Alege angajatul</em>
                        </MenuItem>
                        {angajati.map(({ nume, prenume }, index) => (
                          <MenuItem key={index} value={nume + ' ' + prenume}>
                            {nume} {prenume}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormGroup>
                      <TextField
                        controlid="data"
                        sx={{ mt: 2 }}
                        id="data"
                        label="Introduceți data"
                        variant="outlined"
                        required
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <FormControl type="text" required />
                    </FormGroup>

                    <FormControl required sx={{ mt: 2, width: '100%' }}>
                      <InputLabel id="ziua">Alege ziua</InputLabel>
                      <Select
                        labelId="ziua"
                        id="ziua"
                        label="Alege ziua*"
                        value={ziua}
                        onChange={(e) => setZiua(e.target.value)}
                      >
                        <MenuItem>
                          <em>Alege ziua</em>
                        </MenuItem>
                        <MenuItem value="Luni">Luni </MenuItem>
                        <MenuItem value="Marti">Marți </MenuItem>
                        <MenuItem value="Miercuri">Miercuri </MenuItem>
                        <MenuItem value="Joi">Joi </MenuItem>
                        <MenuItem value="Vineri">Vineri </MenuItem>
                        <MenuItem value="Sambata">Sambata </MenuItem>
                        <MenuItem value="Duminica">Duminica </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl required sx={{ mt: 2, width: '100%' }}>
                      <InputLabel id="denumireClient">
                        Alege clientul
                      </InputLabel>
                      <Select
                        labelId="denumireClient"
                        id="denumireClient"
                        label="Alege clientul*"
                        value={denumireClient}
                        onChange={(e) => setDenumireClient(e.target.value)}
                      >
                        <MenuItem>
                          <em>Alege clientul</em>
                        </MenuItem>
                        {clienti.map(({ numeClient }, index) => (
                          <MenuItem key={index} value={numeClient}>
                            {numeClient}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                    <FormControl required sx={{ mt: 2, width: '100%' }}>
                      <InputLabel id="denumireServiciu">
                        Alege serviciul
                      </InputLabel>
                      <Select
                        labelId="denumireServiciu"
                        id="denumireServiciu"
                        label="Alege serviciul*"
                        value={denumireServiciu}
                        onChange={(e) => setDenumireServiciu(e.target.value)}
                      >
                        <MenuItem>
                          <em>Alege serviciul</em>
                        </MenuItem>
                        {servicii.map(({ numeServici }, index) => (
                          <MenuItem key={index} value={numeServici}>
                            {numeServici}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormGroup>
                      <TextField
                        controlid="timp"
                        sx={{ mt: 2 }}
                        id="timp"
                        label="Introduceți timpul"
                        variant="outlined"
                        required
                        value={timp}
                        onChange={(e) => setTimp(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        controlid="distanta"
                        sx={{ mt: 2 }}
                        id="distanta"
                        label="Introduceți distanta"
                        variant="outlined"
                        required
                        value={distanta}
                        onChange={(e) => setDistanta(e.target.value)}
                      />
                      <FormControl type="text" required />
                    </FormGroup>{' '}
                    <FormGroup>
                      <TextField
                        controlid="comentariu"
                        sx={{ mt: 2 }}
                        id="comentariu"
                        value={comentariu}
                        label="Introduceți comentariu"
                        variant="outlined"
                        onChange={(e) => setComentariu(e.target.value)}
                      />
                      <FormControl type="text" />
                    </FormGroup>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate(`/interfata`)}
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

export default CreatePontaj;
