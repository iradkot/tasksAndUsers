const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_PASSWORD,
    password: process.env.PG_PASSWORD,
    host:' localhost',
    port: 5432,
    database: 'tasksdb'
});

module.exports = pool;
