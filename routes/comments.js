const commentsRouter = require('express').Router();
const {patchComment, deleteComment} = require('../controllers/commentsController.js')
const {send405} = require('../errorHander.js')

commentsRouter.route('/:comment_id')
.patch(patchComment)
.delete(deleteComment)
.all(send405)

module.exports = commentsRouter;