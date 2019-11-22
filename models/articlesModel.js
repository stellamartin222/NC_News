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
    return connection
        .insert(body)
        .into('comments')
        .returning('*')
        .then(comments => {
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