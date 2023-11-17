const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties.js")

async function list (req, res) {
    const theatersWithMovies = await service.list();
    res.status(200).json({ data: theatersWithMovies})
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}