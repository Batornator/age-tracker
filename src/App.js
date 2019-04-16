import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

import AgeGrid from './AgeGrid/AgeGrid';

import HTTP from './utils/HTTP';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null,
      loaded: false,
      data: [],
      deleteConfirmation: null
    };
  }

  errorCb (error) {
    this.setState({
      loaded: true,
      error
    });
  }

  getData () {
    HTTP.get("data")
      .then((result) => {
        if (result.errors && result.errors.length) {
          return this.errorCb(result.errors[0]);
        }

        this.setState({
          loaded: true,
          data: result.data
        });
      })
      .catch(() => this.errorCb());
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {error, loaded, data} = this.state;

    if (error) {
      return (
        <Alert variant="danger">THERE WAS AN ERROR - {error.message}</Alert>
      );
    }

    if (!loaded) {
      return (
        <div>Loading data...</div>
      );
    }

    return (
      <Container>
        <Row>
          <Col lg="6">
            <AgeGrid
              data={data}
              onRequireRefresh={() => this.getData()}
            ></AgeGrid>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;