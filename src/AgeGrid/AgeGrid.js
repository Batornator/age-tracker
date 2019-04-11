import React, { Component } from 'react';

import './AgeGrid.css';

class AgeGrid extends Component {
  render() {
    let tableContents = this.props.data.map((record, index) => {
      const {name, DOB, ageYears, ageMonths} = record;
      return (
        <tr key={index}>
          <td>{name}</td>
          <td>{DOB}</td>
          <td>{ageYears} Years {ageMonths} Months</td>
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
