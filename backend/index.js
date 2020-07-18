const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = 5000

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //
 //create a task
app.post('/tasks', async(req, res) => {
    try {
        const { description } = req.body;
        console.log({description});
        const newTask = await pool.query(
            "INSERT INTO tasks (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTask.rows[0]);
    } catch (e) {
        console.error(e);
    }
})

 //get all tasks
app.get('/tasks', async (req,res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks');
        res.json(allTasks.rows)
    } catch (e) {
        console.error(e);
    }
})
 //get a task
app.get('/tasks/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
        res.json(task.rows[0])
    } catch (e) {
        console.error(e);
    }
})
 //update a task
app.put('/tasks/:id', async (req,res) => {
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
app.delete('/tasks/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM tasks WHERE task_id=$1', [id]);
        res.json(`Task-${id} was deleted.`);
    } catch (e) {
        console.error(e);
    }
})

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
