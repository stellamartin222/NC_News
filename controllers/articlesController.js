const {fetchArticle, updateArticle} = require('../models/articlesModel.js')

exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id
    fetchArticle(article_id)
        .then(article => {
            res.status(200).send({'article' : article[0]})    
        }
        )
        .catch(next)
        //catch(err => console.log(err))
        
}

exports.patchArticle = (req, res, next) => {
    const body = {article_id : req.params.article_id, newVotes : req.body}
    updateArticle(body)
        .then(article =>
            res.status(202).send({'article' : article[0]})
        ).catch(next)
}