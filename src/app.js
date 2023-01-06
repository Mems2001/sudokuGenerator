const express = require('express');
const app = express();
const port = require('../config').api.port;
const db = require('./utils/database');
const cors = require('cors');

const sudokusRouter = require('./Sudokus/sudokus.router');
const initModels = require('./models/init.models');

app.use(express.json());

db.authenticate()
    .then(() => {
        console.log('Database authenticated')
    })
    .catch(err => {
        console.log(err)
    })
db.sync({force:true})
    .then(() => {
        console.log('Database synced')
    })
    .catch(err => {
        console.log(err)
    })

initModels()

app.get('/' , (req , res) => {
    res.status(200).json({
        message: 'OK!'
    })
});

app.use('/api/v1/sudoku' , cors() , sudokusRouter);

app.listen(port , () => {
    console.log(`Server started at port:${port}`)
})