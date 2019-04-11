"use strict";

const express = require("express");

// Routing here
const dataRoutes = require("./data");

const router = express.Router();

router.use("/data", dataRoutes);

module.exports = router;