
exports.customErrors = (err, req, res, next) => {
 res.status(err.status).send({msg: err.msg})

}

exports.psqlErrors = (err, req, res, next) => {
    const errorMessages = ['42703', '22003', '22P02']
    if (errorMessages.includes(err.code)) {
        res.status(400).send({ msg: 'Bad request' })
    }
    else next(err)
}

exports.internalServerError = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal server error :(' })
}