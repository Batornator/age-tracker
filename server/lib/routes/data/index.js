"use strict";

const express = require("express");
const router = express.Router();

const getRoute = require("./get");
const deleteRoute = require("./delete");

router.get("/", getRoute);

router.delete("/:recordId", deleteRoute);

module.exports = router;