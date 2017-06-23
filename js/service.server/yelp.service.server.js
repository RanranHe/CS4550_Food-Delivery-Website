module.exports = function (app) {
    var request = require('request');

    app.get("/api/yelp", requestFood);
    app.get("/api/yelp/menu", requestMenu);

    var accessToken = '0854dca160710a95';
    function requestFood(req, res) {
        var location = req.query["location"];
        //var limit = req.query["limit"];
        var url = 'https://api.eatstreet.com/publicapi/v1/restaurant/search';
        var options = {
            url: url,
            method: 'GET',
            headers: {
                'x-access-token': accessToken
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

    }

    function requestMenu(req, res) {
        var apiKey = req.query["apikey"];
        var url = "https://api.eatstreet.com/publicapi/v1/restaurant/" + apiKey + "/menu";
        var options = {
            url: url,
            method: 'GET',
            headers: {
                'x-access-token': accessToken
            }
        };
        request(options, function(error, response, body) {
            if (!error) {
                res.json(body);
            }
        });
    }
};