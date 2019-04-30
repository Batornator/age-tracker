import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

import './AgeGrid.css';

class AgeGrid extends Component {
	render () {
		let tableContents = this.props.data.map((record) => {
			const {id, name, DOB, ageYears, ageMonths} = record;
			return (
				<tr key={id}>
					<td>{name}</td>
					<td>{DOB}</td>
					<td>{ageYears} Years {ageMonths} Months</td>
					<td>
						<Button variant="secondary" onClick={() => this.props.onEditRecord(record)}>Edit</Button>
					</td>
					<td>
						<Button variant="danger" onClick={() => this.props.confirmDelete(id)}>Delete</Button>
					</td>
				</tr>
			);
		});

		return (
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
		);
	}
}

export default AgeGrid;
