const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all tasks statuses
router.get('/', async (req, res) => {
    try {
        const allStatuses = await pool.query('SELECT name FROM tasks_statuses');
        res.json(allStatuses.rows);
    } catch (e) {
        console.log({e});
    }
});

module.exports = router;

