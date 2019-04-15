"use strict";

const async = require("async");
const csvParser = require("csv-parse");
const fs = require("fs");
const moment = require("moment");
const path = require("path");

const errorUtils = require("../../util/error");

const filePath = path.join(__dirname, "../../store/ageData.csv");

const fields = [
    "id",
    "name",
    "DOB",
    "ageYears",
    "ageMonths"
];

const checkFileExists = (cb) => {
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            return cb(errorUtils.fileNotFound(err));
        }

        return cb();
    });
};

const readFile = (cb) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));
        }

        return cb(null, data);
    });
};

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

const parseFileContents = (data, cb) => {
    csvParser(data, {columns: fields}, (err, results) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));
        }

        return cb(null, calculateAges(results));
    });
};

// GET:/data/
module.exports = (req, res) => {

    async.waterfall([
        checkFileExists,
        readFile,
        parseFileContents
    ], (err, results) => {
        if (err) {
            return res.status(err.status).json({
                errors: err.errors
            });
        }

        return res.status(200).json({
            data: results
        });
    });
};