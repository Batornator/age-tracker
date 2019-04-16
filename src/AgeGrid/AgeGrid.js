import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

import Confirm from '../Confirm/Confirm';
import HTTP from '../utils/HTTP';

import './AgeGrid.css';

class AgeGrid extends Component {
  
	constructor (props) {
		super(props);

		this.state = {
			deleteConfirmation: null
		};
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

				this.props.onRequireRefresh();
			}).catch(err => {
				this.props.onError("There was an error deleting the record", err);
			});
	}


	editRecord (record) {
		// TODO
	}

	render () {
		let tableContents = this.props.data.map((record) => {
			const {id, name, DOB, ageYears, ageMonths} = record;
			return (
				<tr key={id}>
					<td>{name}</td>
					<td>{DOB}</td>
					<td>{ageYears} Years {ageMonths} Months</td>
					<td>
						<Button variant="secondary" onClick={() => this.editRecord(record)}>Edit</Button>
					</td>
					<td>
						<Button variant="danger" onClick={() => this.confirmDelete(id)}>Delete</Button>
					</td>
				</tr>
			);
		});

		return (
			<React.Fragment>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date Of Birth</th>
							<th>Age</th>
							<th colSpan="2"></th>
						</tr>
					</thead>

					<tbody>
						{tableContents}
					</tbody>
				</Table>

				{ this.state.deleteConfirmation && 
					(
						<Confirm
							message="Are you sure you want to delete this record?"
							confirmAction={() => this.deleteRecord(this.state.deleteConfirmation.recordId)}
							cancelAction={() => this.cancelDelete()}
						></Confirm>
					)
				}
			</React.Fragment>
		);
	}
}

export default AgeGrid;
