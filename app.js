const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js')


app.use(express.json())
app.use('/api', apiRouter)

app.all('/*', (req, res, next) => {
    res.status(404).send({msg :'Route not found'})
});

app.use((err, ))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.code === '22P02'){
        res.status(404).send({msg : 'Route does not exist'})
    }
})


module.exports = app;