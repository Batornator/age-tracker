"use strict";

const path = require("path");

const filePath = path.join(__dirname, "../../store/ageData.csv");

// GET:/csv/
module.exports = (req, res) => {

    res.status(200).download(filePath);

};