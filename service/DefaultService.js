'use strict';


/**
 * Returns 'nearby' to the caller
 *
 * lat BigDecimal Latitude of selected location
 * lng BigDecimal longitude of selected location
 * returns NearbyResponse
 **/
exports.nearby = function(lat,lng) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "nearby_sites" : [ {
    "site_name" : "site_name",
    "agent_name" : "agent_name"
  }, {
    "site_name" : "site_name",
    "agent_name" : "agent_name"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

