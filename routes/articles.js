const articlesRouter = require('express').Router();
const {getArticle, patchArticle, postArticle, getCommentsByArticle, getArticles} = require('../controllers/articlesController.js')


articlesRouter.route('/:article_id')
.get(getArticle)
.patch(patchArticle)

articlesRouter.route('/:article_id/comments')
.post(postArticle)
.get(getCommentsByArticle)

articlesRouter.route('/')
    .get(getArticles)

module.exports = articlesRouter;