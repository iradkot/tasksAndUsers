const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host:'localhost',
    port: 5432,
    database: process.env.PG_DATABASE
});

module.exports = pool;
