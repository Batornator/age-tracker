"use strict";

const async = require("async");
const uuidv4 = require('uuid/v4');

const ageCalculationProgram = require("../../programs/ageCalculation");
const ageDataStore = require("../../store/ageData");

const addRecordToDataSet = (newData, dataSet, cb) => {
    const recordId = uuidv4();
    const newRecord = ageCalculationProgram.calculateAge({ ...newData, id: recordId });
    
    dataSet.push(newRecord);

    ageDataStore.writeDataToFile(dataSet, (err) => {
        if (err) {
            return cb(err);
        }

        return cb(null, recordId);
    });
};

// DELETE:/data/
module.exports = (req, res) => {

    async.waterfall([
        ageDataStore.getData,
        async.apply(addRecordToDataSet, req.body)
    ], (err, recordId) => {
        if (err) {
            return res.status(err.status).json({
                errors: err.errors
            });
        }
        
        return res.status(200).json({
            data: { id: recordId }
        });
    });

};