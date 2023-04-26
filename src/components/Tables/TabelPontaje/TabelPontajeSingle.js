import MaterialTable from 'material-table';
import './style.css';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
          `https://iqrserver.onrender.com/api/pontaje/mine `,
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

  //Functie stergere date tabel

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

  // ForEach date din tabel
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

  const columnsPDF = [
    {
      title: 'NUME',
      field: 'numeAngajat',
    },
    {
      title: 'DATA',
      field: 'data',
      type: 'date',
    },
    {
      title: 'ZIUA',
      field: 'ziua',
    },
    {
      title: 'CLIENT',
      field: 'denumireClient',
    },
    {
      title: 'Servicii',
      field: 'denumireServiciu',
    },
    { title: 'TIMP', field: 'timp' },
    { title: 'DISTANTA ', field: 'distanta' },
    {
      title: 'CMT',
      field: 'comentariu',
    },
  ];

  const columnsAdmin = [
    {
      title: 'ID',
      field: '_id',
      hidden: true,
    },
    {
      title: 'NUME',
      field: 'numeAngajat',
      cellStyle: {
        minWidth: '200px',
      },
    },
    {
      title: 'DATA',
      field: 'data',
      type: 'date',
    },
    {
      title: 'ZIUA',
      field: 'ziua',
      filtering: false,
    },
    {
      title: 'CLIENT',
      field: 'denumireClient',
      cellStyle: {
        minWidth: '250px',
      },
    },
    {
      title: 'Servicii',
      field: 'denumireServiciu',
      cellStyle: {
        whiteSpace: 'nowrap',
        overflow: 'auto',
        maxWidth: '250px',
      },
    },
    { title: 'TIMP', field: 'timp', filtering: false },
    { title: 'DISTANTA ', field: 'distanta', filtering: false },
    {
      title: 'CMT',
      filtering: false,
      field: 'comentariu',
      cellStyle: {
        minWidth: '200px',
      },
    },
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
              onClick={() => navigate(`/interfata/${data._id}`)}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  //Filtrare dupa data
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filter, setFilter] = useState(false); //buton arata filtrele

  const handleChange = () => {
    setFilter(!filter);
  };

  const handleStartDateChange = (data) => {
    setSelectedStartDate(data);
  };

  const handleEndDateChange = (data) => {
    setSelectedEndDate(data);
  };

  const filterData = (startDate, endDate) => {
    return data.filter((item) => {
      const itemDate = new Date(item.data);
      return startDate && endDate
        ? itemDate >= startDate && itemDate <= endDate
        : true;
    });
  };

  //Selecteaza randul si exporta
  const selectedRow = React.useRef([]);
  const handleClick = (rows) => {
    selectedRow.current = rows;
  };

  const exportAllSelectedRows = () => {
    new CsvBuilder('pontaje.csv')
      .setColumns(columnsPDF.map((col) => col.title))
      .addRows(
        selectedRow.current.map((pontaj) =>
          columnsPDF.map((col) => pontaj[col.field])
        )
      )
      .exportFile();
  };

  const exportAllSelectedRowsPDF = () => {
    const doc = new jsPDF();
    doc.text('Pontaje', 20, 10);
    doc.autoTable({
      columns: columnsPDF.map((col) => ({ ...col, dataKey: col.field })),
      body: selectedRow.current.map((pontaj) =>
        columnsPDF.map((col) => pontaj[col.field])
      ),
      styles: {
        fontSize: 8,
        font: 'helvetica',
      },
    });
    doc.save('pontaje.pdf');
  };
  return (
    <>
      {' '}
      <Box sx={{ mb: 1, textAlign: 'left' }}>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Data de început"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              format="dd/MM/yyyy"
              clearable
              inputVariant="outlined"
              sx={{ backgroundColor: '#fff' }}
            />
            <DatePicker
              label="Data de sfârșit"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              format="dd/MM/yyyy"
              clearable
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </div>
      </Box>
      <MaterialTable
        title="Pontaje"
        icons={tableIcons}
        onSelectionChange={(e) => {
          handleClick(e);
        }}
        columns={columnsAdmin}
        data={filterData(selectedStartDate, selectedEndDate)}
        options={{
          sorting: true,
          filtering: filter,
          search: false,
          columnsButton: true,
          exportButton: true,
          showFirstLastPageButtons: true,
          showTextRowsSelected: false,
          paginationType: 'custom',
          paginationComponent: CustomPagination,
          selection: true,
          pageSizeOptions: [5, 10, 20, { value: data.length, label: 'All' }],
          headerStyle: {
            backgroundColor: '#000041',
            color: '#fff',
          },
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
          SortLabel: (props) => (
            <div
              {...props}
              style={{
                ...props.style,
                color: props.active ? '#fff' : '#fff',
              }}
            />
          ),
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
      />
    </>
  );
}

export default DataPontaje;
