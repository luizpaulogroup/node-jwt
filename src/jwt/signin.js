const jwt = require('jsonwebtoken');

const config = require('./config.json');

module.exports = payload => jwt.sign(payload, config.secret, { expiresIn: 86400 });