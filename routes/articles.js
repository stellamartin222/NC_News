const articlesRouter = require('express').Router();
const {getArticle, patchArticle, postArticle, getCommentsByArticle, getArticles} = require('../controllers/articlesController.js')
const {send405} = require('../errorHander.js')

articlesRouter.route('/:article_id')
.get(getArticle)
.patch(patchArticle)
.all(send405)

articlesRouter.route('/:article_id/comments')
.post(postArticle)
.get(getCommentsByArticle)
.all(send405)

articlesRouter.route('/')
    .get(getArticles)
    .all(send405)

module.exports = articlesRouter;