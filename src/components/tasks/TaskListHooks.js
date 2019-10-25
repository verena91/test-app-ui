import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';

import { TableHead } from '@material-ui/core';
import TaskForm from './TaskForm';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    alignItems: 'flex-end'
  }
}));

export default function CustomPaginationActionsTable({match}) {
  const classes = useStyles2();
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  React.useEffect(() => {
    getPaginatedTasks();
  }, []);

  const getPaginatedTasks = () => {
    axios.get('/ws/rest/tasks/paginated', { params: { pageSize: rowsPerPage, first: page * rowsPerPage }})
    .then(res => {
      setRows(res.data.tasks);
      setCount(res.data.count);
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    axios.get('/ws/rest/tasks/paginated', { params: { pageSize: rowsPerPage, first: newPage * rowsPerPage }})
    .then(res => {
      setRows(res.data.tasks);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    axios.get('/ws/rest/tasks/paginated', { params: { pageSize: rowsPerPage, first: page * rowsPerPage }})
    .then(res => {
      setRows(res.data.tasks);
    })
    .catch(err => {
      console.log(err);
    });
  };

  // TODO: en ambos casos falta actualizar la tabla
  // Nueva funcion para actualizar la tarea como resuelta
  const resolveTask = row => {
    row.resuelta = !row.resuelta;
    axios.put(`/ws/rest/tasks/${row.id}`, row)
    .then(res => {
      alert('Tarea actualizada correctamente');
      getPaginatedTasks();

    })
    .catch(err => {
      console.log(err);
    });
  };

  // Nueva funcion para borrar una tarea
  const deleteTask = id => {
    axios.delete(`/ws/rest/tasks/${id}`)
    .then(res => {
      alert('Tarea borrada correctamente');
      getPaginatedTasks();
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10}>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link} 
            to={`${match.url}/new`}
          >
            <AddIcon />
            Nuevo
          </Button>
        </Grid>
      </Grid>
      
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">Nombre</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.description}
                  </TableCell>
                  <TableCell align="right">
                    {moment(row.limitDate).format('DD/MM/YYYY')}
                  </TableCell>
                  {/* Nueva columna para mostrar un check si está marcada */}
                  <TableCell>
                    <Checkbox 
                      checked={row.resuelta} 
                      disabled
                      value="checkedA" />
                  </TableCell>
                  {/* Acciones de la tabla */}
                  <TableCell align="center">
                    <IconButton 
                      aria-label="resolve" 
                      className={classes.margin} 
                      onClick={() => resolveTask(row)}>
                        {/* Para mostrar icono de acuerdo a si esta realizada o no */}
                      { row.resuelta ? <CloseIcon fontSize="default" /> : <CheckIcon fontSize="default" />}
                    </IconButton>
                    <IconButton 
                      aria-label="edit" 
                      className={classes.margin} 
                      component={Link} 
                      to={`${match.url}/edit/${row.id}`}>
                      <EditIcon fontSize="default" />
                    </IconButton>
                    <IconButton 
                      aria-label="delete" 
                      className={classes.margin} 
                      onClick={() => deleteTask(row.id)}>
                      <DeleteIcon fontSize="default" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : <TableCell>No existen datos</TableCell>}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10]}
                  colSpan={3}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    </>
  );
}