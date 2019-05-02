import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AgeGridRow extends Component {
	render () {
        const {data, onEditRecord, confirmDelete} = this.props;
        const {id, name, DOB, ageYears, ageMonths} = data;

		return (
            <tr>
                <td>{name}</td>
                <td>{DOB}</td>
                <td>{ageYears} Years {ageMonths} Months</td>
                <td>
                    <Button variant="secondary" onClick={() => onEditRecord(data)}>Edit</Button>
                </td>
                <td>
                    <Button variant="danger" onClick={() => confirmDelete(id)}>Delete</Button>
                </td>
            </tr>
        );
	}
}

export default AgeGridRow;
