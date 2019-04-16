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

  logError (error) {
    console.error("Unexpected Error occurred", error);
  }

  errorCb (error) {
    this.logError(error);
    this.setState({
      loaded: true,
      error: "Error loading data"
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
      .catch((err) => this.errorCb(err));
  }

  onError (message, error) {
    this.logError(error);
    this.setState({
      error: message
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {error, loaded, data} = this.state;

    if (error) {
      return (
        <Alert variant="danger">{error || "Unknown error occurred"}</Alert>
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
              onError={(message, err) => this.onError(message, err)}
            ></AgeGrid>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;