const apiRouter = require('express').Router();
const topicsRouter = require('./topics.js')
const usersRouter = require('./users.js')
const articleRouter = require('./articles.js')
const commentsRouter = require('./comments.js')
const {send405} = require('../errorHander.js')

apiRouter.route('/').get(getAll).all(send405)

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/articles', articleRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;