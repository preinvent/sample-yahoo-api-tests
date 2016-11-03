var queryString = require('query-string');

module.exports.getQueryForLocation = function(location) {
    return "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "')";
};

module.exports.getUrlForLocation = function(location) {
    var query = this.getQueryForLocation(location);
    var params = {
        q: query,
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
    };
    return "/v1/public/yql?" + queryString.stringify(params);
};