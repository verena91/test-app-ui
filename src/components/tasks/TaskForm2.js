import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class TaskForm2 extends React.Component {

  state = {
    task: {}
  }

    componentDidMount() {
      const { match } = this.props;
      if (match.params.taskId) {
        axios.get(`/ws/rest/tasks/${match.params.taskId}`)
        .then((rsp) => {
          this.setState({ task: rsp.data });
        });
      }
    }

  handleChange = field => (e) => {
    // e.target.value -> tiene el valor de lo que escriben
    switch(field){
      case 'name':
        let updatedTask = {};
        updatedTask.name = e.target.value;
        updatedTask.description = this.state.task.description;
        this.setState({ task: updatedTask });
      break;
      case 'description':
        let updatedTask2 = {};
        updatedTask2.name = this.state.task.name;
        updatedTask2.description = e.target.value;
        this.setState({ task: updatedTask2 });
      default:
          this.setState({ task: { ...this.state.task, [field]: e.target.value } });
      break;
    }
  }

  handleSubmit = () => {
    const { match, history } = this.props;
    if (match.params.taskId) {
      axios.put(`/ws/rest/tasks/${match.params.taskId}`, this.state.task)
      .then((rsp) => {
        this.setState({ task: rsp.data });
        alert('exito');
        history.push('/tasks');
      });
    } else {
      axios.post(`/ws/rest/tasks/`, this.state.task)
      .then((rsp) => {
        this.setState({ task: rsp.data });
        alert('exito');
        history.push('/tasks');
      });
    }
  }

  render() {

    const { match } = this.props;
    const { task } = this.state;

    return (
      <>
        <h2>{ match.params.taskId ? 'Editar Tarea' : 'Nueva Tarea' }</h2>

        <TextField
          id="standard-name"
          label="Nombre"
          value={task.name || ''}
          onChange={this.handleChange('name')}
          margin="normal"
        />

        <TextField
          id="standard-description"
          label="Descripcion"
          value={task.description || ''}
          onChange={this.handleChange('description')}
          margin="normal"
        />

        {/* Date Picker */}

        <br/>
        <br/>
        <Button variant="contained" component={Link} to={'/tasks'}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Guardar
        </Button>

      </>
    )
  }
}

export default TaskForm2;