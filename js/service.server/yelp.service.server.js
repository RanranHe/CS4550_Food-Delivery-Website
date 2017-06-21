module.exports = function (app) {
    var request = require('request');

    app.get("/api/yelp", requestFood);

    function requestFood(req, res) {
        var location = req.query["location"];
        //var limit = req.query["limit"];
        var url = 'https://api.eatstreet.com/publicapi/v1/restaurant/search';
        authenticate(function(err, body) {
            var parsed = JSON.parse(body);
            var token = parsed.access_token;
            token = "Bearer " + token;
            var options = {
                url: url,
                method: 'GET',
                headers: {
                    'x-access-token': '0854dca160710a95'
                },
                qs: {
                    'street-address': location
                }
            };
            request(options, function(error, response, body) {
                if(!error) {
                    res.json(body);
                }
            });
        });


    }
};