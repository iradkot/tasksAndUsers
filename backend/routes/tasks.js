const express = require('express');
const router = express.Router();
const pool = require('../db');

//get all user tasks (gets user_id in request)
router.get('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        const allTasks = await pool.query(`SELECT tasks.task_id, tasks.name, tasks_statuses.name as status
                                           FROM tasks
                                                    FULL OUTER JOIN users on tasks.user_id = users.user_id
                                                    FULL OUTER JOIN tasks_statuses on tasks.status_id = tasks_statuses.status_id
                                           WHERE users.user_id = $1
                                             AND tasks.name IS NOT NULL;`, [ user_id ]);
        res.json(allTasks.rows)
    } catch (e) {
        console.error(e);
    }
});

//create a task for user
router.post('/', async (req, res) => {
    try {
        const { user_id } = req.query;
        const { name } = req.body;
        const taskName = 'created'; // for now tasks start with default value of 'created'
        const newTask = await pool.query(`INSERT INTO tasks (user_id, status_id, name)
                                          VALUES ($1,
                                                  (SELECT status_id FROM tasks_statuses WHERE name = $2),
                                                  $3);`,
            [ user_id, taskName, name ]
        );
        res.json(newTask.rows[0]);
    } catch (e) {
        console.error(e);
    }
})
//update a task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        const updateTask = await pool.query('UPDATE tasks SET name = $1, status_id = (SELECT status_id FROM tasks_statuses WHERE name = $2) WHERE task_id = $3 RETURNING *', [ name, status, id ]);
        res.json(updateTask.rows[0]);
    } catch (e) {
        console.error(e);
    }
})
//delete a task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM tasks WHERE task_id=$1', [ id ]);
        res.json(`Task-${ id } was deleted.`);
    } catch (e) {
        console.error(e);
    }
})

module.exports = router;
