const topicsRouter = require('express').Router();
const {getTopics} = require('../controllers/topicsController.js')
const {send405} = require('../errorHander.js')

topicsRouter.route('/')
    .get(getTopics)
    .all(send405)

module.exports = topicsRouter;