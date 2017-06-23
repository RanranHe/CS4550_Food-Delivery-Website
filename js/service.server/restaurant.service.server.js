module.exports = function (app, models) {
    var restaurantModel = models.restaurantModel;

    app.post("/api/project/user/:userId/restaurant", createRestaurant);

    app.get("/api/project/review/", findReviewByRestaurant);
    app.get("/api/project/review/:reviewId", findReviewById);
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

    function findReviewByRestaurant(req, res) {
        var restaurantName = req.query['restaurant'];

        reviewModel
            .findReviewByRestaurant(restaurantName)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.send(null);
            });
    }

    function findReviewById(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel
            .findReviewById(reviewId)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.send(null);
                    // res.status(400).send(err);
                }
            );
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