"use strict";

const express = require("express");
const path = require("path");

// Routing here
const dataRoutes = require("./data");

const router = express.Router();

router.use("/",  express.static(path.join(__dirname, "../../../build/")));
router.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "../../../build/index.html"));
});

router.use("/data", dataRoutes);

module.exports = router;