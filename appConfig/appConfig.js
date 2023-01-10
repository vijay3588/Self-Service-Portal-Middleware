const env = process.env.SSP_MID_NODE_ENV || 'prod'

module.exports = require(`./${env}/config.js`) 