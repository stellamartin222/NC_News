const {fetchUser} = require('../models/usersModel.js')

exports.getUser = (req, res, next) => {
    const username = req.params.username
    fetchUser(username)
        .then(user => {
            if(user.length < 1) {
                res.status(404).send({msg: 'Bad request'})
            }
            res.status(200).send({'user': user[0]})
        }).catch(next)
}