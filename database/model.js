
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('database/database.db');

module.exports = database;