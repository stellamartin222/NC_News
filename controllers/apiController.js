const endPointsJSON = require("../")

exports.getAll = (req, res, next) => {
    const availableEndpoints = endPointsJSON;
    res.status(200).json({ availableEndpoints });
  };