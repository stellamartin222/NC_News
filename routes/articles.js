const articlesRouter = require('express').Router();
const {getArticle, patchArticle} = require('../controllers/articlesController.js')

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle)

module.exports = articlesRouter;