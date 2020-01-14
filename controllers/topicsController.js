const {fetchTopics} = require('../models/topicsModel.js')

exports.getTopics = (req, res, next) => {
    fetchTopics()
        .then(topics => {
            res.status(200).send({topics})})
        .catch(next);
};