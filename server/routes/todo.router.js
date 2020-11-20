const express = require('express');
const todoRouter = express.Router();
// DB CONNECTION
const pool = require('../modules/pool'); 

todoRouter.get('/', (req, res) => {
    let sqlText = `SELECT * FROM todos ORDER BY task;`;
    pool.query(sqlText)
        .then((result) => {
            console.log('Got back', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error from db', error);
            res.sendStatus(500)});
});

// POST
todoRouter.post('/', (req, res) => {
    let task = req.body
    let sqlText = `INSERT INTO todos ("task", "completed") 
                   VALUES ($1, $2);`                 
    // $1 and $2 are filled in by the array below the query  
    pool.query(sqlText, [task.task, task.complete])
        .then( (response) => {
            res.sendStatus(201) // send OK status, insert complete
        }) 
        .catch((error)=>{
            console.log('error from db', error); 
            // res.sendStatus()
        })
});



module.exports = todoRouter;