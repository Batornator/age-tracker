"use strict";

const fileNotFound = (err) => {
    console.error(err);

    return {
        status: 404,
        errors: [
            { message: "Data file could not be found" }
        ]
    };
};

const unexpectedServerError = (err) => {
    console.error(err);

    return {
        status: 500,
        errors: [
            { message: "Unexpected error encountered" }
        ]
    };
};

module.exports = {
    fileNotFound,
    unexpectedServerError
};