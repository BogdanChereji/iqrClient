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
import { Button, IconButton, Switch } from '@mui/material';
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CsvBuilder } from 'filefy';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, echipamente: action.payload, loading: false };
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

function DataEchipamente() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ echipamente, error, successDelete }, dispatch] = useReducer(
    reducer,
    {
      echipamente: [],
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/echipamente `,
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
  echipamente &&
    echipamente.forEach((echipament) => {
      data.push({
        _id: echipament._id,
        numeEchipament: echipament.numeEchipament,
        descriereEchipament: echipament.descriereEchipament,
      });
    });

  const columnsAdmin = [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    { title: 'NUME', field: 'numeEchipament' },
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
              onClick={() => navigate(`/admin/echipament/${data._id}`)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/echipament/${data.numeEchipament}`)}
              aria-label="view"
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const columnsUser = [{ title: 'NUME', field: 'numeEchipament' }];

  const deleteHandler = async (echipament) => {
    if (window.confirm('Ești sigur că vrei să stergi înregistrarea?')) {
      try {
        await axios.delete(
          `https://iqrserver.onrender.com/api/echipamente/${echipament._id}`,
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
  const [filter, setFilter] = useState(false); //buton arata filtrele
  const handleChange = () => {
    setFilter(!filter);
  };

  const exportAllSelectedRows = () => {
    new CsvBuilder('pontaje.csv')
      .setColumns(columnsUser.map((col) => col.title))
      .addRows(
        selectedRow.current.map((pontaj) =>
          columnsUser.map((col) => pontaj[col.field])
        )
      )
      .exportFile();
  };

  const exportAllSelectedRowsPDF = () => {
    const doc = new jsPDF();
    doc.text('Pontaje', 20, 10);
    doc.autoTable({
      columns: columnsUser.map((col) => ({ ...col, dataKey: col.field })),
      body: selectedRow.current.map((pontaj) =>
        columnsUser.map((col) => pontaj[col.field])
      ),
      styles: {
        fontSize: 8,
        font: 'helvetica',
      },
    });
    doc.save('pontaje.pdf');
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
          title="Echipamente"
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
            sorting: true,
            filtering: filter,
            search: false,
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
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
              icon: () => (
                <Switch
                  checked={filter}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              ),
              tooltip: 'Arata filtrele',
              isFreeAction: true,
            },
            {
              icon: () => (
                <Button onClick={exportAllSelectedRows} variant="contained">
                  Exporta CSV
                </Button>
              ),
              tooltip: 'Exportă toate rânduri selectate',
            },
            {
              icon: () => (
                <Button onClick={exportAllSelectedRowsPDF} variant="contained">
                  Exporta PDF
                </Button>
              ),
              tooltip: 'Exportă toate rânduri selectate',
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
          title="Echipamente"
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
            selection: true,
            sorting: true,
            filtering: filter,
            search: false,
            pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
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

export default DataEchipamente;
