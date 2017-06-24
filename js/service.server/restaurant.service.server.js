module.exports = function (app, models) {
    var restaurantModel = models.restaurantModel;


    app.post("/api/project/user/:userId/restaurant", createRestaurant);
    app.get("/api/project/restaurant/:restaurantId", findRestaurantById);
    app.get("/api/project/user/:userId/restaurant", findRestaurantByUserId);

    app.put("/api/project/review/:reviewId", updateReview);
    app.delete('/api/review/:reviewId', deleteReview);

    function createRestaurant(req, res) {
        var userId = req.params.userId;
        var restaurant = req.body;

        restaurantModel
            .createRestaurant(userId, restaurant)
            .then(
                function (restaurant) {
                    res.sendStatus(200);
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
            .then(function (restaurantIds) {
                restaurantModel
                    .findRestaurantsByIds(restaurantIds)
                    .then(function (restaurants) {
                        var finalHashWidgetList = getHashedList(restaurants);
                        // Helper function
                        function getHashedList(restaurants) {
                            var hashRestaurantList = [];
                            for (var i in restaurants) {
                                hashRestaurantList[restaurants[i]._id] = restaurants[i];
                            }
                            return hashRestaurantList;
                        }

                        var restaurantList = [];

                        for (var i = 0; i < restaurantIds.length; i++) {
                            var restaurantId = restaurantIds[i];
                            var restaurant = finalHashWidgetList[restaurantId];
                            restaurantList.push(restaurant);
                        }
                        console.log("service: " + restaurantList)
                        res.json(restaurantList);
                    })
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params['reviewId'];
        var review = req.body;

        reviewModel
            .updateReview(reviewId, review)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel
            .deleteReview(reviewId)
            .then(function (status) {
                    res.json(200);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

};