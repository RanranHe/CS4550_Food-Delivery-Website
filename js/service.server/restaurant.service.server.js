module.exports = function (app, models) {
    var restaurantModel = models.restaurantModel;

    app.post("/api/project/user/:userId/restaurant", createRestaurant);
    app.get("/api/project/restaurant/:restaurantId", findRestaurantById);
    app.get("/api/project/user/:userId/restaurant", findRestaurantByUserId);
    app.put("/api/project/restaurant/:restaurantId", updateRestaurant);
    app.delete('/api/project/restaurant/:restaurantId', deleteRestaurant);
    app.put("/api/project/restaurant/insertFood/:restaurantId", insertFood);

    function createRestaurant(req, res) {
        var userId = req.params.userId;
        var restaurant = req.body;

        restaurantModel
            .createRestaurant(userId, restaurant)
            .then(
                function (restaurant) {
                    res.json(restaurant);
                },
                function (err) {
                });
    }

    function findRestaurantById(req, res) {
        var restaurantId = req.params.restaurantId;

        restaurantModel
            .findRestaurantById(restaurantId)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (err) {
                res.send(null);
            });
    }

    function findRestaurantByUserId(req, res) {
        var userId = req.params['userId'];
        restaurantModel
            .findRestaurantByUserId(userId)
            .then(function (restaurants) {
                res.json(restaurants);
            });
    }

    function updateRestaurant(req, res) {
        var restaurantId = req.params['restaurantId'];
        var restaurant = req.body;
        restaurantModel
            .updateRestaurantById(restaurantId, restaurant)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteRestaurant(req, res) {
        var restaurantId = req.params.restaurantId;
        restaurantModel
            .deleteRestaurantById(restaurantId)
            .then(
                function (response) {
                    res.json(response);
                }
            );
    }

    function insertFood(req, res) {
        var restaurantId = req.params['restaurantId'];
        var newFood = req.body;
        restaurantModel.insertFood(restaurantId, newFood).then(
            function(response) {
                res.json(response);
            }
        )
    }

};