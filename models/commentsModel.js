const connection = require('../db/connection.js')

const updateComment = (body) => {
   console.log('model')
   return connection('comments')
   .where({'comments.comment_id': body.comment_id})
   .increment('votes', body.newVotes.inc_votes)
   .returning('*')
   .then(comments => {
      console.log('this is pants')
   });
};

module.exports = {updateComment};