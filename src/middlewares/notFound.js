const { StatusCodes } = require("http-status-codes");

const notFound = (res) => {
    res.status(StatusCodes.NOT_FOUND).json({message: "Route Not Found..."});
}

module.exports = notFound