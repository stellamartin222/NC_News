const usersRouter = require('express').Router();
const {getUser} = require('../controllers/usersController.js')
const {send405} = require('../errorHander')

usersRouter.route('/:username')
    .get(getUser)
    .all(send405)

module.exports = usersRouter;