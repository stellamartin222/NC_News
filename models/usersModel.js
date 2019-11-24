const connection = require('../db/connection.js')

exports.fetchUser = (username) => {
    return connection('users')
        .select('*')
        .where('username', username) 
        .then(user => {
            if(user.length < 1) {
                return Promise.reject({status: 404, msg: 'Bad request'})
            }
            return user
        })
}