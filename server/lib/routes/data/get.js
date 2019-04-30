"use strict";

const ageCalculationProgram = require("../../programs/ageCalculation");
const ageDataStore = require("../../store/ageData");

const calculateAges = (data) => {
    return data.map((record) => ageCalculationProgram.calculateAge(record));
};

// GET:/data/
module.exports = (req, res) => {

    ageDataStore.getData((err, results) => {
        if (err) {
            return res.status(err.status).json({
                errors: err.errors
            });
        }
        
        return res.status(200).json({
            data: calculateAges(results)
        });
    });

};