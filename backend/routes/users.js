const express = require('express');
const router = express.Router();
const pool = require('../db');

//create a user
router.post('/', async(req, res) => {
    try {
        const { email, name, surname, birth_date } = req.body;
        const newTask = await pool.query(
            "INSERT INTO users (email, name, surname, birth_date) VALUES($1, $2, $3, $4) RETURNING *",
            [email, name, surname, birth_date]
        );
        res.json(newTask.rows[0]);
    } catch (e) {
        console.error(e);
    }
})

// get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (e) {
        console.log({e});
    }
});

//get a user
router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
        res.json(user.rows[0])
    } catch (e) {
        console.error(e);
    }
})
//update a user
router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { email, name, surname, birth_date } = req.body;
        const updateUser = await pool.query('UPDATE users SET email = $1, name = $2, surname = $3, birth_date = $4 WHERE user_id = $5 RETURNING *',
            [email, name, surname, birth_date, id]);
        res.json(updateUser.rows[0]);
    } catch (e) {
        console.error(e);
    }
})
//delete a user
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE user_id=$1', [id]);
        res.json(`User-${id} was deleted.`);
    } catch (e) {
        console.error(e);
    }
})

module.exports = router;
