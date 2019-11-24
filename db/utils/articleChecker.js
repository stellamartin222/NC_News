const connection = require('../connection.js')

exports.existingArticle = (article_id) => {
        connection('articles')
        .where({article_id: article_id})
        .then(article => {
            if(article) {
                return true
            }
            return false
        })
}