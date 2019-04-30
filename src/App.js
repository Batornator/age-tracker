import React, { Component } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

import AgeGrid from './AgeGrid/AgeGrid';
import Confirm from './Confirm/Confirm';
import AgeInputForm from './AgeInputForm/AgeInputForm';
import HTTP from './utils/HTTP';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      error: null,
      loaded: false,
      data: [],
			deleteConfirmation: null,
			editingRecord: null
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

  getFile () {
    window.open("http://localhost:1337/csv");
  }

	confirmDelete (recordId) {
		this.setState({
			deleteConfirmation: {
				recordId
			}
		});
	}

	cancelDelete () {
		this.setState({
			deleteConfirmation: null
		});
	}

	deleteRecord (recordId) {
		HTTP.delete(`data/${recordId}`)
			.then(resp => {
				this.setState({
					deleteConfirmation: null
				});

				this.getData();
			}).catch(err => {
				this.onError("There was an error deleting the record", err);
			});
	}

	onEditRecord (record) {
		this.setState({
			editingRecord: {...record}
		});
	}

	cancelEdit () {
		this.setState({
			editingRecord: null
		});
	}

	saveRecord (record) {
		let apiCall;
		if (record.id) {
			apiCall = HTTP.put(`data/${record.id}`, { body: record });
		} else {
			apiCall = HTTP.post(`data`, { body: record });
		}

		apiCall.then(resp => {
			this.setState({
				editingRecord: null
			});

			this.getData();
		}).catch(err => {
			this.onError("There was an error saving the record", err);
		});
  }
  
  addRecord () {
    this.setState({
			editingRecord: {
        name: null,
        DOB: null
      }
		});
  }

  render() {
    const {error, loaded, data, editingRecord, deleteConfirmation} = this.state;

    if (!loaded) {
      return (
        <div>Loading data...</div>
      );
    }

    return (
      <Container>
        {error && (<Alert variant="danger" dismissible>{error || "Unknown error occurred"}</Alert>)}
        <Row>
          <Col sm="12" lg="6">
            <AgeGrid
              data={data}
              onEditRecord={(record) => this.onEditRecord(record)}
              confirmDelete={(recordId) => this.confirmDelete(recordId)}
            ></AgeGrid>
          </Col>
          <Col sm="12" lg="6">
            <Row>
              <Col sm="12" lg="3">
                <Button onClick={() => this.addRecord()}>Add New Record</Button>
              </Col>
              <Col sm="12" lg="3">
                <Button onClick={() => this.getFile()}>Download CSV</Button>
              </Col>
            </Row>
          </Col>
        </Row>

				{ deleteConfirmation && 
					(
						<Confirm
							message="Are you sure you want to delete this record?"
							confirmAction={() => this.deleteRecord(this.state.deleteConfirmation.recordId)}
							cancelAction={() => this.cancelDelete()}
						></Confirm>
					)
				}

				{ editingRecord && 
					(
						<AgeInputForm
							record={editingRecord}
							onCancel={() => this.cancelEdit()}
							onSave={(record) => this.saveRecord(record)}
						></AgeInputForm>
					)
				}

      </Container>
    );
  }
}

export default App;