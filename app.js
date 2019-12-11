const express = require('express');
const app = express();
var cors = require('cors')
const apiRouter = require('./routes/api.js')
const {customErrors, psqlErrors, internalServerError} = require('./errorHander.js')

app.use(cors())

app.use(express.json())
app.use('/api', apiRouter)

app.all('/*', (req, res, next) => {
    res.status(404).send({msg :'Route not found'})
});

app.use(customErrors)
app.use(psqlErrors)
app.use(internalServerError)

module.exports = app;