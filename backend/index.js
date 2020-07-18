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
        console.log('todos post e:', e);
    }
})

 //get all todos
 //get a todo
 //update a todo
 //delete a todo


app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
