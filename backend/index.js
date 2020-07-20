const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = 5000

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const tasksStatusesRouter = require('./routes/tasks_statuses');
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/tasks_statuses', tasksStatusesRouter);

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
