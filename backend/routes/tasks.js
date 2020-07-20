const express = require('express');
const router = express.Router();
const pool = require('../db');

// noinspection SqlResolve
const queryUserTasks = `SELECT tasks.task_id, tasks.name, tasks_statuses.name as status FROM tasks
    FULL OUTER JOIN users on tasks.user_id = users.user_id
    FULL OUTER JOIN tasks_statuses on tasks.status_id = tasks_statuses.status_id
WHERE users.user_id = $1 AND tasks.name IS NOT NULL;`;

//get all user tasks (gets user_id in request)
router.get('/', async (req,res) => {
    try {
        const { user_id } = req.query;
        const allTasks = await pool.query(queryUserTasks, [user_id]);
        res.json(allTasks.rows)
    } catch (e) {
        console.error(e);
    }
});
//get a task
router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
        res.json(task.rows[0])
    } catch (e) {
        console.error(e);
    }
})
//update a task
router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTask = await pool.query('UPDATE tasks SET description = $1 WHERE task_id = $2 RETURNING *', [description, id]);
        res.json(updateTask.rows[0]);
    } catch (e) {
        console.error(e);
    }
})
//delete a task
router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM tasks WHERE task_id=$1', [id]);
        res.json(`Task-${id} was deleted.`);
    } catch (e) {
        console.error(e);
    }
})

module.exports = router;
