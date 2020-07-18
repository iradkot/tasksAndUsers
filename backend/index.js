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
 //get all todos
 //get a todo
 //update a todo
 //delete a todo


app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
