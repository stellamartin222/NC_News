const connection = require('../db/connection.js')

const fetchArticle = (article_id) => {
    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
        .where('articles.article_id', article_id)
        .groupBy('articles.article_id')
        .count('comments.comment_id as comment_count')    
};

const updateArticle = (body) => {
    return connection('articles')
        .where({article_id: body.article_id})
        .increment('votes', body.newVotes.inc_votes)
        .returning('*')
};

const createArticle = (body) => {
    console.log(body)
    return connection
        .insert(body)
        .into('comments')
        .returning('*')
        .then(comments => {
           console.log('this')
            if (body.article_id.length < 1){
                return res.status(404).send({msg : 'Route not found'})
            }
            else return comments
        })
}

const fetchCommentsByArticle = ({body, sortBy, orderBy}) => {
     return connection('comments')
        .select('*')
        .where({article_id: body.article_id})
        .orderBy(sortBy || 'created_at', orderBy || "desc")
        .returning('*')
            .then(comments => {
                if (body.article_id.length < 1){
                    return res.status(404).send({msg : 'Route not found'})
                }
                else return comments
            })
}

const fetchArticles = ({body, sortBy, orderBy}) => {
    console.log('in the model')
    // return connection('articles')
    //     .returning('*')
}

module.exports = {
    fetchArticle,
    updateArticle,
    createArticle,
    fetchCommentsByArticle,
    fetchArticles
}