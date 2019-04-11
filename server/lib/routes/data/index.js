"use strict";

const express = require("express");
const router = express.Router();

const getRoute = require("./get");

router.get("/", getRoute);

module.exports = router;