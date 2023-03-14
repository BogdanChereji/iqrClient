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

function ViewEchiament() {
  const params = useParams();
  const { numeEchipament } = params;
  const [{ loading, error, echipamente }, dispatch] = useReducer(reducer, {
    echipament: [],
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  //Campuri
  const [numeEchipamenta, setNumeEchipament] = useState('');
  const [descriereEchipament, setDescriereEchipament] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/echipamente/nume/${numeEchipament}`
        );
        setNumeEchipament(data.numeEchipament);
        setDescriereEchipament(data.descriereEchipament);

        dispatch({ type: 'FETCH_SUCCES' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [numeEchipament]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container
          sx={{
            mt: {
              md: 10, // theme.breakpoints.up('md')
              lg: 10, // theme.breakpoints.up('lg')
              xl: 10, // theme.breakpoints.up('xl')
            },
          }}
          disableGutters
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Detalii echipament</Typography>{' '}
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate(`/echipamente`)}
              >
                Înapoi
              </Button>
            </Box>

            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <form>
                <Box
                  sx={{
                    mb: 2,
                  }}
                >
                  <Box>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="numeEchipament"
                        sx={{ mt: 2 }}
                        id="numeEchipament"
                        label="nume echipament "
                        variant="outlined"
                        value={numeEchipamenta}
                      />
                      <FormControl type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <TextField
                        InputProps={{
                          readOnly: true,
                        }}
                        controlid="descriereEchipament"
                        sx={{ mt: 2 }}
                        id="descriereEchipament"
                        multiline
                        rows={4}
                        label="Descrierea echipamentului"
                        variant="outlined"
                        value={descriereEchipament}
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

export default ViewEchiament;
