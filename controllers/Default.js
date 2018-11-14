'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.nearby = function nearby (req, res, next) {
  var lat = req.swagger.params['lat'].value;
  var lng = req.swagger.params['lng'].value;
  Default.nearby(lat,lng)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
