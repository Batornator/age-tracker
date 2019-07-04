"use strict";

const path = require("path");
const filePath = path.join(__dirname, "../../store/ageData.csv");

const ageCalculationProgram = require("../../programs/ageCalculation");
const ageDataStore = require("../../store/ageData");

const calculateAges = (data) => {
  return data.map((record) => ageCalculationProgram.calculateAge(record));
};

// GET:/csv/
module.exports = (req, res) => {

  ageDataStore.getData((err, results) => {
    if (err) {
      return res.status(err.status).json({
        errors: err.errors
      });
    }

    ageDataStore.writeDataToFile(calculateAges(results), (err) => {
      if (err) {
        return cb(err);
      }

      res.status(200).download(filePath);
    });
  });

};