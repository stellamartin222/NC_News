const connection = require('../db/connection.js')

exports.fetchArticle = (article_id) => {
    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
        .where('articles.article_id', article_id)
        .groupBy('articles.article_id')
        .count('comments.comment_id as comment_count')    
};

exports.updateArticle = (body) => {
    return connection('articles')
        .where({article_id: body.article_id})
        .increment('votes', body.newVotes.inc_votes)
        .returning('*')
};

exports.createArticle = (body) => {
    return connection
        .insert(body)
        .into('comments')
        .returning('*')
}

exports.fetchCommentsByArticle = (body) => {
    console.log('in the model')
}