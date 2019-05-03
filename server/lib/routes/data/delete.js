"use strict";

const async = require("async");

const ageDataStore = require("../../store/ageData");

const removeRecordFromDataSet = (recordId, dataSet, cb) => {
    const recordIndex = dataSet.findIndex((record) => record.id === recordId);
    dataSet.splice(recordIndex, 1);

    ageDataStore.writeDataToFile(dataSet, cb);
};

// DELETE:/data/:recordId
module.exports = (req, res) => {

    async.waterfall([
        ageDataStore.getData,
        async.apply(removeRecordFromDataSet, req.params.recordId)
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