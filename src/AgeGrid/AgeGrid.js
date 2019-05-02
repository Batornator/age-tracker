import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import AgeGridRow from './AgeGridRow'

import './AgeGrid.css';

class AgeGrid extends Component {
	render () {
		const {data, onEditRecord, confirmDelete} = this.props;

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
					{data.map(record => {
						return <AgeGridRow
							key={record.id}
							data={record}
							onEditRecord={(record) => onEditRecord(record)}
							confirmDelete={(id) => confirmDelete(id)}
						></AgeGridRow>;
					})}
				</tbody>
			</Table>
		);
	}
}

export default AgeGrid;
