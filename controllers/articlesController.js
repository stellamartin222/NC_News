const {
    fetchArticle, 
    updateArticle, 
    createArticle, 
    fetchCommentsByArticle, 
    fetchArticles} = require('../models/articlesModel.js')

exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id
    fetchArticle(article_id)
        .then(article => {
            if (article.length < 1) {
               next({status : 404, msg : 'Resource does not exist'})
            } else {
                res.status(200).send({'article' : article[0]})
            }
        }).catch(next)
        
}

exports.patchArticle = (req, res, next) => {
    if (typeof req.body.inc_votes !== "number") {
        next({status:400, msg : 'Bad request'})
    } else {
        const body = {article_id : req.params.article_id, newVotes : req.body}
        updateArticle(body)
            .then(article =>{
                res.status(202).send({'article' : article[0]})
            }).catch(next)
    }
}

exports.postArticle = (req, res, next) => {
    if (typeof req.body.username !== "string") {
        res.status(400).send({msg : 'Bad request'})
    } 
    else {
        const body = {article_id : req.params.article_id, author : req.body.username, body : req.body.body}
        createArticle(body)
            .then(article =>{
                res.status(201).send({'comment': article[0]})
            }).catch(next)
    }
}

exports.getCommentsByArticle = (req, res, next) => {
    const body = req.params
    const sortBy = req.query.sort_by
    const orderBy = req.query.order
    fetchCommentsByArticle({body, sortBy, orderBy}) 
        .then(comments => {
            if(comments.length < 1){
                res.status(404).send({msg : 'Route not found'})
            } else {
                res.status(200).send({'comments' : comments})
            }
        }).catch(next)
}

exports.getArticles = (body) => {
    // const body = req.params
    // const sortBy = req.query.sort_by
    // const orderBy = req.query.order
    fetchArticles({body, sortBy, orderBy}) 
        .then(articles => {
            console.log("articles")
            // if(comments.length < 1){
            //     res.status(404).send({msg : 'Route not found'})
            // } else {
            //     res.status(200).send({'comments' : comments})
            // }
        }).catch(next)
}