const {updateComment} = require('../models/commentsModel.js')

exports.patchComment = (req, res, next) => {
    const body = req.params
    console.log(body)
    console.log('controller')
    updateComment(body)
    .then(comment => {
        console.log('beans on toast');
        res.status(202).send({'comment' : comment})
    }).catch(err => console.log(err))
}