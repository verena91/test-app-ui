import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// import MomentUtils from '@date-io/moment';
import {
  // MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
  button: {
    margin: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
  }
});

class TaskForm extends React.Component {

  state = {
    count: 0,
    value: null,
    task: { limitDate: new Date() },
    types: []
  }

  componentDidMount() {
    // Se obtienen los tipos del backend, para mostrarlos en el select
    axios.get('/ws/rest/types')
      .then(res => {
        const types = res.data.map(type => ({value: type.id, name: type.name}))
        this.setState({ types, originalTypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
    const { match } = this.props;
    // Si es una edicion, entonces se obtienen los datos de la tarea del backend
    if (match.params.taskId) {
      axios.get(`/ws/rest/tasks/${match.params.taskId}`)
      .then(res => {
        let task = res.data;
        // task.type = res.data.type ? { value: res.data.type.id, name: res.data.type.name } : null;
        task.type = res.data.type ? res.data.type.id : null;
        this.setState({ task });
      })
      .catch(err => {
        console.log(err);
      });
    }
    
  }

  // Metodo ejecutado al hacer click en guardar
  handleSubmit = () => {
    const { match, history } = this.props;
    const { originalTypes, task } = this.state;
    // Tenemos que modificar el tipo porque no se ve igual en nuestro objeto que en el select
    task.type = originalTypes.filter(t => t.id === task.type)[0];
    task.limitDate = new Date(task.limitDate);
    // Si es una edición,, entonces se llama al método put, sino se llama al metodo post
    if (match.params.taskId) {
      axios.put(`/ws/rest/tasks/${task.id}`, task)
      .then(res => {
        alert('Tarea actualizada correctamente');
        history.push('/tasks');
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      axios.post('/ws/rest/tasks', task)
      .then(res => {
        alert('Tarea actualizada correctamente');
        history.push('/tasks');
      })
      .catch(err => {
        console.log(err);
      });
    }
    
  };

  // Funcion que actualiza los atributos de la variable task dentro del state
  handleChange = field => (e) => {
    switch(field){
      case 'limitDate':
        this.setState({ task: { ...this.state.task, [field]: e } });
      break;
      default:
          this.setState({ task: { ...this.state.task, [field]: e.target.value } });
      break;
    }
  };

  render() {
    const { match, classes } = this.props;
    const { task, types } = this.state; //this.state.task
    return (
      <>
          <h2>{match.params.taskId ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
          <form>
            {/* Seccion de datos */}
            <Grid container spacing={3}>
              <TextField
                id="name"
                label="Nombre"
                className={classes.textField}
                value={task.name || ''}
                onChange={this.handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="description"
                label="Descripción"
                className={classes.textField}
                value={task.description || ''}
                onChange={this.handleChange('description')}
                margin="normal"
                fullWidth
              />
              {/* Selector, carga datos de tipos */}
              <Grid item xs={12}>
                <FormControl 
                  fullWidth
                  className={classes.formControl}
                  >
                  <InputLabel htmlFor="type-simple">Tipo de tarea</InputLabel>
                  <Select 
                    value={task.type || ''}
                    onChange={this.handleChange('type')}  
                  >
                    {types.map(type => {
                      return <MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>
                    })}
                    {/* <MenuItem key={1} value={1}>test</MenuItem>
                    <MenuItem key={2} value={2}>test1</MenuItem>
                    <MenuItem key={3} value={3}>test2</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <DatePicker 
                  format="DD/MM/YYYY"
                  fullWidth
                  value={task.limitDate} 
                  onChange={this.handleChange('limitDate')} />
              </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
              {/* Seccion de botones Aceptar/Cancelar */}
            <Grid container spacing={2} item xs={12}>
                <Grid item xs={4}/>
                <Grid item xs={2}>
                  <Button variant="contained" color="default" type="button" component={Link} to={'/tasks'}>
                    Cancelar  
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                    Guardar
                  </Button>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
          </form>
      </>
    );
  }

}

export default withStyles(styles)(TaskForm);
