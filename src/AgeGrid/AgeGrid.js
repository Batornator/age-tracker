import React, { Component } from 'react';

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
            <button onClick={() => this.props.editRecord(record)}>Edit</button>
          </td>
          <td>
            <button onClick={() => this.props.deleteRecord(id)}>Delete</button>
          </td>
        </tr>
      );
    });

    return (
      <table className="age-grid">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Age</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tableContents}
        </tbody>
      </table>
    );
  }
}

export default AgeGrid;
