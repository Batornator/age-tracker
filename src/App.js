import React, { Component } from 'react';
import HTTP from './utils/HTTP';

import AgeGrid from './AgeGrid/AgeGrid.js';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null,
      loaded: false,
      data: []
    };
  }

  errorCb (error) {
    this.setState({
      loaded: true,
      error
    });
  }

  componentDidMount() {
    fetch("http://localhost:1337/data")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.errors && result.errors.length) {
            return this.errorCb(result.errors[0]);
          }

          this.setState({
            loaded: true,
            data: result.data
          });
        },
        this.errorCb
      )
  }


  editRecord (record) {
    // TODO
  }

  deleteRecord (recordId) {
    HTTP.delete(`data/${recordId}`)
    .then(resp => {
      console.log(resp); // TODO : Handle response
    }).catch(err => {
      console.error(err); // TODO : Handle errors
    });
  }

  render() {
    const {error, loaded, data} = this.state;

    if (error) {
      return (
        <div>THERE WAS AN ERROR - {error.message}</div>
      );
    }

    if (!loaded) {
      return (
        <div>Loading data...</div>
      );
    }

    return (
      <AgeGrid
        data={data}
        editRecord={this.editRecord}
        deleteRecord={this.deleteRecord}
      ></AgeGrid>
    );
  }
}

export default App;