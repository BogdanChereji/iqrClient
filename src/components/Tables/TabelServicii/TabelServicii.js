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
      return { ...state, servicii: action.payload, loading: false };
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
function CustomPagination(props) {
  const { ActionsComponent, page, pageSize, totalCount, onPageChange } = props;

  const numPages = Math.ceil(totalCount / pageSize);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>{`Page ${page + 1} of ${numPages}`}</div>
      <ActionsComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function DataServicii() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [{ servicii, error, successDelete }, dispatch] = useReducer(reducer, {
    servicii: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://iqrserver.onrender.com/api/servici `,
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
  servicii &&
    servicii.forEach((servici) => {
      data.push({
        _id: servici._id,
        numeServici: servici.numeServici,
        descriereServici: servici.descriereServici,
      });
    });

  const columnsAdmin = [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    { title: 'NUME', field: 'numeServici' },
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
              onClick={() => navigate(`/admin/servici/${data._id}`)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/servici/${data.numeServici}`)}
              aria-label="view"
            >
              <VisibilityIcon />
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
    { title: 'NUME', field: 'numeServici' },
  ];

  const deleteHandler = async (servici) => {
    if (window.confirm('Ești sigur că vrei să stergi înregistrarea?')) {
      try {
        await axios.delete(
          `https://iqrserver.onrender.com/api/servici/${servici._id}`,
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

  //Selecteaza randul si exporta

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

  let headerStyle = {
    backgroundColor: '#000041',
    color: '#ffffff',
  };

  return (
    <Box sx={{ width: '100%' }}>
      {userInfo && userInfo.isAdmin ? (
        <MaterialTable
          data={data}
          columns={columnsAdmin}
          title="Servicii"
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
            showFirstLastPageButtons: true,
            paginationType: 'custom',
            paginationComponent: CustomPagination,
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
          title="Servicii"
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
            showFirstLastPageButtons: true,
            paginationType: 'custom',
            paginationComponent: CustomPagination,
            selection: false,
            search: false,
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

export default DataServicii;
