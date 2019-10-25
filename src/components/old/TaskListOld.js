import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  button: {
    margin: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
});

class Blog extends React.Component {

  state = {
    count: 0,
    value: null,
    tasks: []
  }

  componentDidMount() {
    // axios.get('http://localhost:8088/ws/rest/tasks')
    axios.get('ws/rest/tasks')
      .then(res => {
        this.setState({ tasks: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // const { classes } = this.props; // this.props.classes
    const { tasks } = this.state; //this.state.tasks
    return (
      <>
        <List>
          { tasks.map(p => {
            return (
              <ListItem key={p.id}>
                <ListItemText
                  primary={p.name}
                  secondary={p.description}
                />
              </ListItem>
            )}
          ) }
        </List>
      </>
    );
  }

}

export default Blog;

// Blog.propTypes = {
//   classes: PropTypes.shape({}).isRequired,
// };

// export default withStyles(styles)(Blog);
