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
    people: []
  }

  componentDidMount() {
    axios.get('https://swapi.co/api/people')
      .then(res => {
        this.setState({ people: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // const { classes } = this.props; // this.props.classes
    const { people } = this.state; //this.state.people
    return (
      <>
        <List>
          { people.map(p => {
            return (
              <ListItem key={p.name}>
                <ListItemText
                  primary={p.name}
                  secondary={p.gender}
                />
              </ListItem>
            )}
          ) }
        </List>
        <p>{hola}</p>
      </>
    );
  }

}

export default Blog;

// Blog.propTypes = {
//   classes: PropTypes.shape({}).isRequired,
// };

// export default withStyles(styles)(Blog);
