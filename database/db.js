const mysql = require('mysql')
const db_config = require('./db_config')
const pool = mysql.createPool(db_config)


module.exports = pool