const connection = require('../db/connection.js')

const updateComment = (inc_votes, comment_id) => {
   return connection('comments')
   .where({'comments.comment_id': comment_id.comment_id})
   .increment('votes', inc_votes.inc_votes)
   .returning('*')
};

const removeComment = (body) => {
   return connection('comments')
   .where('comment_id', body.comment_id)
   .del();
}

module.exports = {updateComment, removeComment};