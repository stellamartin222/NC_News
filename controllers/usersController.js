const {fetchUser} = require('../models/usersModel.js')

exports.getUser = (req, res, next) => {
    const username = req.params.username
    fetchUser(username)
        .then(user => {
            res.status(200).send({'user': user[0]})
        }).catch(next)
}