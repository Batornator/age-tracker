"use strict";

const moment = require("moment");

const ageDataStore = require("../../store/ageData");

const calculateAges = (data) => {
    return data.map((record) => {
        const {id, name, DOB} = record;

        const dobMoment = moment(DOB, "DD/MM/YYYY");
        const ageYears = moment().diff(dobMoment, "years");
        const monthsSinceBirth = moment().diff(dobMoment, "months");
        const ageMonths = monthsSinceBirth - (ageYears * 12);
        
        return {
            id,
            name,
            DOB,
            ageYears,
            ageMonths
        };
    });
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