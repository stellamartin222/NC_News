const {updateComment, removeComment} = require('../models/commentsModel.js')

exports.patchComment = (req, res, next) => {
    const inc_votes = req.body
    const comment_id = req.params
    updateComment(inc_votes, comment_id)
    .then(comment => {
        res.status(202).send({'comment' : comment[0]})
    }).catch(next)
}

exports.deleteComment = (req, res, next) => {
    const body = req.params
    removeComment(body)
    .then(comment => {
        res.sendStatus(204)
    })
    .catch(next)
}