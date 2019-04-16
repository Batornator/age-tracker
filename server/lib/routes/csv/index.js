"use strict";

const express = require("express");
const router = express.Router();

const downloadRoute = require("./download");

router.get("/", downloadRoute);

module.exports = router;