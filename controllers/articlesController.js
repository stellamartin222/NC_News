const {fetchArticle, updateArticle, createArticle, fetchCommentsByArticle} = require('../models/articlesModel.js')

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

// exports.getCommentsByArticle = (req, res, next) => {
//     console.log('in the controller')
//     const body = req.params
//     fetchCommentsByArticle(body) 
//         .then(comments => {
//             console.log("i made it here")
//         }).catch(console.log)
// }