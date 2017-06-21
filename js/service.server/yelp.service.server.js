module.exports = function (app) {
    var request = require('request');

    app.get("/api/yelp", requestFood);

    function requestFood(req, res) {
        var location = req.query["location"];
        var limit = req.query["limit"];
        var url = 'https://api.yelp.com/v3/businesses/search';
        authenticate(function(err, body) {
            var parsed = JSON.parse(body);
            var token = parsed.access_token;
            token = "Bearer " + token;
            var options = {
                url: url,
                method: 'GET',
                headers: {
                    'Authorization': token
                },
                qs: {
                    'location': location,
                    'limit': limit
                }
            };
            request(options, function(error, response, body) {
                if(!error) {
                    res.json(body);
                }
            });
        });


    }

    function authenticate(callback) {
        var clientId = process.env.YELP_CUSTOMERID;
        var token = process.env.YELP_TOKEN;
        var authParams = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: token
        };
        var options = {
            url: 'https://api.yelp.com/oauth2/token',
            method: 'POST',
            form: authParams
        };
        request(options, function(error, response, body) {
            if(!error) {
                return callback(null, body);
            }
        });
    }
};