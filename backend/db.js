const mysql = require('mysql');
const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'notes'
});

module.exports = db;