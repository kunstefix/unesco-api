'use strict';
var calculator = require('./calulator');


/**
 * Returns 'nearby' to the caller
 *
 * lat BigDecimal Latitude of selected location
 * lng BigDecimal longitude of selected location
 * returns NearbyResponse
 **/
exports.nearby = function (lat, lng) {
  return new Promise(function (resolve, reject) {

    try {

      calculator.calculateDistance(lat, lng).then((value) => {
        console.log("RESOLVED: ", value);
        let res = value;
        var result = {};
        result['application/json'] = {
          nearby_sites: res
        };

        if (Object.keys(result).length > 0) {
          resolve(result[Object.keys(result)[0]]);
        } else {
          resolve();
        }

      });

    } catch (error) {
      console.log(error);
    }




  });
}

