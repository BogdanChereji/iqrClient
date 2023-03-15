import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import Typography from '@mui/material/Typography';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Breadcrumbs, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'react-google-charts';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('sm'));

  var options = {
    legend: 'left',
    title: 'Număr ore lucrate/ lună',
    hAxis: {
      title: 'Ore lucrate',
    },
    backgroundColor: 'none',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/infos/summary `,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <Container disableGutters sx={{ mt: 1 }}>
      <div>
        {loading ? (
          <LoadingBox />
        ) : (
          <>
            {userInfo && mdUp ? (
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate(`/`)}
                >
                  IQR
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate(`#`)}
                >
                  Panou de control
                </Link>
                {userInfo && userInfo.isAdmin ? (
                  <Typography>Admin</Typography>
                ) : (
                  ''
                )}
              </Breadcrumbs>
            ) : (
              ''
            )}

            {userInfo ? (
              <Box
                sx={{
                  display: {
                    md: 'flex', // theme.breakpoints.up('md')
                    lg: 'flex', // theme.breakpoints.up('lg')
                    xl: 'flex', // theme.breakpoints.up('xl')
                  },
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  textAlign: '-webkit-center',
                }}
              >
                <Card
                  sx={{
                    minWidth: { md: '250px', lg: '250px', xl: '250px' },
                    textAlign: 'left',
                    m: 2,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }}>Utilizatori</Typography>

                    <Typography
                      sx={{
                        fontSize: 30,
                      }}
                    >
                      {summary.users && summary.users[0]
                        ? summary.users[0].numUsers
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: { md: '250px', lg: '250px', xl: '250px' },
                    textAlign: 'left',
                    m: 2,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }}>Angajati</Typography>

                    <Typography sx={{ fontSize: 30 }}>
                      {summary.angajati && summary.angajati[0]
                        ? summary.angajati[0].numAngajati
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    minWidth: { md: '250px', lg: '250px', xl: '250px' },
                    textAlign: 'left',
                    m: 2,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }}>Clienti</Typography>
                    <Typography sx={{ fontSize: 30 }}>
                      {summary.clienti && summary.clienti[0]
                        ? summary.clienti[0].numClienti
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
                <Chart
                  options={options}
                  width="100%"
                  height="400px"
                  chartType="BarChart"
                  loader={<div>Loading...</div>}
                  data={[
                    ['Date', 'Ore lucrate', { role: 'style' }],
                    ...summary.pontajZilnic.map((x) => [
                      x._id,
                      x.numOre,
                      '#000041',
                    ]),
                  ]}
                />
              </Box>
            ) : (
              'Vă rugăm să vă conectați'
            )}
          </>
        )}
      </div>
    </Container>
  );
}
