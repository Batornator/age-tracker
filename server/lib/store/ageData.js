"use strict";

const async = require("async");
const csvParser = require("csv-parse");
const csvStringify = require("csv-stringify");
const fs = require("fs");
const path = require("path");

const errorUtils = require("../util/error");

const filePath = path.join(__dirname, "./ageData.csv");

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
            return cb(null, false);
        }

        return cb(null, true);
    });
};

const readFileIfExists = (fileExists, cb) => {
    if (!fileExists) {
        return cb(null, []);
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));
        }

        return cb(null, data);
    });
};

const parseFileContents = (data, cb) => {
    if (!data || !data.length) {
        return cb(null, []);
    }
    
    csvParser(data, {columns: fields}, (err, results) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));
        }

        return cb(null, results);
    });
};

const getData = (cb) => {
    async.waterfall([
        checkFileExists,
        readFileIfExists,
        parseFileContents
    ], cb);
};

const stringifyData = (data, cb) => {
    csvStringify(data, (err, csvData) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));;
        }

        return cb(null, csvData);
    });
};

const writeFile = (csvData, cb) => {
    fs.writeFile(filePath, csvData, "utf8", (err) => {
        if (err) {
            return cb(errorUtils.unexpectedServerError(err));
        }

        return cb();
    });
};

const writeDataToFile = (data, cb) => {
    async.waterfall([
        async.apply(stringifyData, data),
        writeFile
    ], cb);
};

module.exports = {
    getData,
    writeDataToFile
};