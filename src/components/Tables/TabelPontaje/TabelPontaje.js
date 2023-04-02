import MaterialTable from 'material-table';
import React, { useEffect, useReducer, useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import axios from 'axios';
import { getError } from '../../../utils';
import { Store } from '../../../Store';
import tableIcons from '../tableIcons.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CsvBuilder } from 'filefy';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, pontaje: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function DataPontaje() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ pontaje, error, successDelete }, dispatch] = useReducer(reducer, {
    pontaje: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/pontaje `,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    }
  }, [userInfo, successDelete]);

  //Tabel

  const selectedRow = React.useRef([]);
  const handleClick = (rows) => {
    selectedRow.current = rows;
  };

  const data = [];
  pontaje &&
    pontaje.forEach((pontaj) => {
      data.push({
        _id: pontaj._id,
        numeAngajat: pontaj.numeAngajat,
        data: pontaj.data,
        ziua: pontaj.ziua,
        denumireClient: pontaj.denumireClient,
        denumireServiciu: pontaj.denumireServiciu,
        timp: pontaj.timp,
        distanta: pontaj.distanta,
        comentariu: pontaj.comentariu,
        user: pontaj.user,
      });
    });
  const columnsAdmin = [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    { title: 'NUME', field: 'numeAngajat' },
    {
      title: 'DATA',
      field: 'data',
      type: 'date',
      dateSetting: { locale: 'en-GB' },
    },
    {
      title: 'ZIUA',
      field: 'ziua',
    },
    { title: 'CLIENT', field: 'denumireClient' },
    {
      title: 'Servicii',
      field: 'denumireServiciu',
      cellStyle: {
        whiteSpace: 'nowrap',
        overflow: 'auto',
        maxWidth: '250px',
      },
    },
    { title: 'TIMP', field: 'timp' },
    { title: 'DISTANTA ', field: 'distanta' },
    { title: 'CMT', field: 'comentariu' },
    {
      title: 'ACTIUNI',
      align: 'center',
      render: (data) => {
        return (
          <Box sx={{ display: 'inline-flex' }}>
            <IconButton onClick={() => deleteHandler(data)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/admin/pontaj/${data._id}`)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columnsUser = [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    { title: 'NUME', field: 'numeAngajat' },
    {
      title: 'DATA',
      field: 'data',
      type: 'date',
      dateSetting: { locale: 'en-GB' },
    },
    { title: 'ZIUA', field: 'ziua' },
    { title: 'CLIENT', field: 'denumireClient' },
    {
      title: 'Servicii',
      field: 'denumireServiciu',
      cellStyle: {
        whiteSpace: 'nowrap',
        overflow: 'auto',
        maxWidth: '250px',
      },
    },
    { title: 'TIMP', field: 'timp' },
    { title: 'DISTANTA ', field: 'distanta' },
    { title: 'CMT', field: 'comentariu' },
  ];

  const deleteHandler = async (pontaj) => {
    if (window.confirm('Ești sigur că vrei să stergi înregistrarea?')) {
      try {
        await axios.delete(
          `https://iqrserver.onrender.com/api/pontaje/${pontaj._id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('Înregistrarea a fost ștearsă');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };
  const exportAllSelectedRows = () => {
    new CsvBuilder('pontaje.csv')
      .setColumns(columnsAdmin.map((col) => col.title))
      .addRows(
        selectedRow.current.map((pontaj) =>
          columnsAdmin.map((col) => pontaj[col.field])
        )
      )
      .exportFile();
  };
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdDw = useMediaQuery(theme.breakpoints.down('md'));

  let customStyle = {
    width: '100%',
  };

  let headerStyle = {
    backgroundColor: '#000041',
    color: '#ffffff',
  };

  if (smUp) {
    customStyle = {
      ...customStyle,
      width: '30ch',
      color: '#1f1f1f',
    };
  }

  if (mdDw) {
    customStyle = {
      ...customStyle,
      marginRight: '13px',
      width: '13ch',
      color: '#1f1f1f',
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      {userInfo && userInfo.isAdmin ? (
        <MaterialTable
          data={data}
          columns={columnsAdmin}
          title="Pontaje"
          icons={tableIcons}
          onSelectionChange={(e) => {
            handleClick(e);
          }}
          options={{
            padding: 'dense',
            headerStyle: headerStyle,
            showTextRowsSelected: false,
            columnsButton: true,
            exportButton: true,
            showFirstLastPageButtons: false,
            paginationType: 'normal',
            selection: true,
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
            searchFieldStyle: customStyle,
          }}
          localization={{
            pagination: {
              labelRowsSelect: 'rânduri',
              labelRowsPerPage: false,
              labelDisplayedRows: `{from} din {count}`,
            },
            body: {
              emptyDataSourceMessage: 'Nu sunt date de afișat',
            },
          }}
          actions={[
            {
              tooltip: 'Exportă toate rânduri selectate',
              icon: () => <SaveAltIcon />,
              onClick: () => exportAllSelectedRows(),
            },
          ]}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
        />
      ) : (
        <MaterialTable
          data={data}
          columns={columnsUser}
          title="Pontaje"
          icons={tableIcons}
          onSelectionChange={(e) => {
            handleClick(e);
          }}
          options={{
            padding: 'dense',
            headerStyle: {
              backgroundColor: '#000041',
              color: '#ffffff',
            },
            columnsButton: true,
            exportButton: false,
            showFirstLastPageButtons: false,
            paginationType: 'normal',
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
            selection: false,
            searchFieldStyle: customStyle,
          }}
          localization={{
            pagination: {
              labelRowsSelect: 'rânduri',
              labelRowsPerPage: false,
              labelDisplayedRows: `{from} din {count}`,
            },
            body: {
              emptyDataSourceMessage: 'Nu sunt date de afișat',
            },
          }}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
        />
      )}
    </Box>
  );
}

export default DataPontaje;
