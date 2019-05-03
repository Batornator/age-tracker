"use strict";

const async = require("async");

const ageCalculationProgram = require("../../programs/ageCalculation");
const ageDataStore = require("../../store/ageData");

const updateRecordInDataSet = (recordId, newData, dataSet, cb) => {
    const recordIndex = dataSet.findIndex((record) => record.id === recordId);
    const newRecord = ageCalculationProgram.calculateAge({ ...newData, id: recordId });

    dataSet.splice(recordIndex, 1, newRecord);

    ageDataStore.writeDataToFile(dataSet, cb);
};

// PUT:/data/:recordId
module.exports = (req, res) => {

    async.waterfall([
        ageDataStore.getData,
        async.apply(updateRecordInDataSet, req.params.recordId, req.body)
    ], (err) => {
        if (err) {
            return res.status(err.status).json({
                errors: err.errors
            });
        }

        return res.status(200).json({
            data: { id: req.params.recordId }
        });
    });

};