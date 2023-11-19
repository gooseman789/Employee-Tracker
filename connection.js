require('dotenv').config();
const mysql = require('mysql2')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    console.log('Connected to the Database')
)

module.exports = db