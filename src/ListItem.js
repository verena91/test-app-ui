import React from 'react';

class ListItem extends React.Component {

  render() {
    const { imagen, parrafo } = this.props;
    return (
      <div>
        <h1>titulo</h1>
        <img src={imagen}/>
        <p>{parrafo}</p>
      </div>
    )
  }

}

export default ListItem;
