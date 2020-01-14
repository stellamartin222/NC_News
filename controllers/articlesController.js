const {
    fetchArticle, 
    updateArticle, 
    createArticle, 
    fetchCommentsByArticle, 
    fetchArticles,
    checkAuthorExists,
    checkTopicExists} = require('../models/articlesModel.js')

exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id
    fetchArticle(article_id)
        .then(article => {
                res.status(200).send({'article' : article[0]})
        }).catch(next)
        
};

exports.patchArticle = (req, res, next) => {
        updateArticle(req)
            .then(article =>{
               return res.status(200).send({'article' : article})
            }).catch(next)
};

exports.postArticle = (req, res, next) => {
        const body = {article_id : req.params.article_id, author : req.body.username, body : req.body.body}
        createArticle(body)
            .then(article =>{
                res.status(201).send({'comment': article[0]})
            }).catch(next)
};

exports.getCommentsByArticle = (req, res, next) => {
    const body = req.params
    const sortBy = req.query.sort_by
    const orderBy = req.query.order
    fetchCommentsByArticle({body, sortBy, orderBy}) 
        .then(comments => {
            res.status(200).send({'comments' : comments});
        }).catch(next)
};

exports.getArticles = (req, res, next) => {
    const sortBy = req.query.sort_by
    const orderBy = req.query.order
    const author = req.query.author
    const topic = req.query.topic
    return fetchArticles(sortBy, orderBy, author, topic) 
    .then(articles => {
        res.status(200).send({'articles' : articles})
    }).catch(next)
};