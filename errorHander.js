
exports.customErrors = (err, req, res, next) => {
    if (err.msg){
        res.status(err.status).send({msg: err.msg})
    }
    else next(err)
}

exports.psqlErrors = (err, req, res, next) => {
    const errorMessages = ['42703', '22003', '22P02']
    const invalidInput = ['23503']
    if (errorMessages.includes(err.code)) {
        res.status(400).send({ msg: 'Bad request' })
    } else if (invalidInput.includes(err.code)) {
        res.status(404).send({ msg: 'Route not found' })
    }
    else next(err)
}

exports.send405 = (req, res) => {
    res.status(405).send('method not found')
}

exports.internalServerError = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error :(' })
}
