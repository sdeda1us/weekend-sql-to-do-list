const pg = require('pg'); 

// get the Pool object from pg
const Pool= pg.Pool; 
// Make our instance of a pool from that template pool object 
const pool = new Pool({ 
    // give pg some info on hwo to connect with our database 
    database: 'weekend-to-do-app', //THIS WILL CHANGE -- your actual database name 
    host: 'localhost', // connect to our local computer
    port: 5432, // port
    max: 10,    // max number of connection 
    idleTimeoutMillis: 30000 // 30 sec
}); 

// When we connect to the database, fun function 
pool.on('connect', () => {
    console.log(`connected to the data base...`)
}) 

pool.on ('error', (error) => {
    console.log('Error from pg', error)
})

module.exports = pool; 