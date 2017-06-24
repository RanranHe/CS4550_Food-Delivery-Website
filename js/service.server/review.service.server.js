module.exports = function (app, models) {
    var reviewModel = models.reviewModel;

    app.post("/api/project/review", createReview);
    app.get("/api/project/review/restaurant", findReviewByRestaurant);
    app.get("/api/project/review/:reviewId", findReviewById);
    app.put("/api/project/review/:reviewId", updateReview);
    app.delete('/api/project/review/:reviewId', deleteReview);

    function createReview(req, res) {
        var review = req.body;
        reviewModel
            .createReview(review)
            .then(
                function (review) {
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