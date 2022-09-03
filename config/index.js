require("dotenv").config();

const config = {};

config.PORT = process.env.PORT;
config.NODE_ENV = process.env.NODE_ENV;

module.exports = config;
