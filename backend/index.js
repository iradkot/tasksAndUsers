const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = 5000

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //
 //create a todo

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

 //get all todos
app.get('/tasks', async (req,res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks');
        res.json(allTasks.rows)
    } catch (e) {
        console.error(e);
    }
})
 //get a todo
app.get('/tasks/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
        res.json(task.rows[0])
    } catch (e) {
        console.error(e);
    }
})
 //update a todo
 //delete a todo


app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
