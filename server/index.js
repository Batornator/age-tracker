"use strict";

const express = require("express");
const opn = require('opn');

const mainRouter = require("./lib/routes");

const port = process.env.PORT || 1337;

const app = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/", mainRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);

    opn(`http://localhost:${port}`);
});