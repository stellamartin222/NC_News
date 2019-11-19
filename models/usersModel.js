const connection = require('../db/connection.js')

exports.fetchUser = (username) => {
    return connection('users')
        .select('*')
        .where('username', username)
}