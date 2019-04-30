"use strict";

const moment = require("moment");

const calculateAge = (record) => {
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
};

module.exports = {
    calculateAge: calculateAge
};