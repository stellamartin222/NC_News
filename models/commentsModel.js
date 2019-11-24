const connection = require('../db/connection.js')

const updateComment = (inc_votes, comment_id) => {
   return connection('comments')
   .where({'comments.comment_id': comment_id.comment_id})
   .increment('votes', inc_votes.inc_votes)
   .returning('*')
   .then(comment => {
      if(comment.length < 1){
         return Promise.reject({status :404, msg : 'Route not found'})
      }
     return comment
   })
};

const removeComment = (body) => {
   return connection('comments')
   .where('comment_id', body.comment_id)
   .del()
   .then(comment => {
      if(comment === 0){
      return Promise.reject({status :404, msg : 'Route not found'})
      }
      return comment
   })
}

module.exports = {updateComment, removeComment};