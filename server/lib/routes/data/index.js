"use strict";

const express = require("express");
const router = express.Router();

const getRoute = require("./get");
const putRoute = require("./put");
const postRoute = require("./post");
const deleteRoute = require("./delete");

router.get("/", getRoute);
router.put("/:recordId", putRoute);
router.post("/", postRoute);
router.delete("/:recordId", deleteRoute);

module.exports = router;