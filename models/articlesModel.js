const connection = require('../db/connection.js')

const fetchArticle = (article_id) => {
    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
        .where('articles.article_id', article_id)
        .groupBy('articles.article_id')
        .count('comments.comment_id as comment_count')    
        .then(article => {
            if(article.length < 1) {
                return Promise.reject({status: 404, msg : 'Route not found'})
             }
             return article
        })
};

const updateArticle = (body) => {
    return connection('articles')
        .where({article_id: body.article_id})
        .increment('votes', body.newVotes.inc_votes)
        .returning('*')
        .then(articles => {
            if(!body.newVotes.inc_votes) {
                return Promise.reject({status : 400, msg : 'Bad request'})
            }
            else if(articles.length < 1){
                return Promise.reject(sendStatus(404).send({msg : 'Route not found'}))
            }
            else if(fetchArticle(body.article_id) && !body.newVotes.inc_votes){
               
            } else {
                return articles
            }
        })
};

const createArticle = (body) => {
    return connection
        .insert(body)
        .into('comments')
        .returning('*')
        .then(comments => {
            if (!body.author){
                return Promise.reject({status:400, msg : 'Bad request'})
            }
            if (body.article_id.length < 1){
                return Promise.reject({status: 404, msg : 'Route not found'})
            }
            else return comments
        })
}

const fetchCommentsByArticle = ({body, sortBy, orderBy}) => {
     return connection('comments', 'articles')
        .select('*')
        .where({article_id: body.article_id})
        .orderBy(sortBy || 'created_at', orderBy || "DESC")
        .returning('*')
            .then(comments => {
                if(comments.length< 1) {
                    return Promise.reject({status: 404, msg : 'Route not found'})
                }
                if (body.article_id.length < 1){
                    return Promise.reject({status: 404, msg : 'Route not found'})
                }
                return comments
            })
}

const fetchArticles = (sortBy, orderBy, author, topic) => {
    return connection('articles')
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .orderBy(sortBy || 'created_at', orderBy || "desc")
        .modify(query => {
            if (author) {
                query.where({'articles.author': author})
            }
            if (topic) {
                query.where({'articles.topic': topic})
            }
        })
        .then(articles => {
            return articles
        });
}



module.exports = {
    fetchArticle,
    updateArticle,
    createArticle,
    fetchCommentsByArticle,
    fetchArticles
}