"use strict";

// DELETE:/data/
module.exports = (req, res) => {
    //TODO actually implement delete route
    return res.status(200).json({
        data: { id: req.params.recordId }
    });
};