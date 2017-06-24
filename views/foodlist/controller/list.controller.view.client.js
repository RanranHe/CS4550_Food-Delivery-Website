(function () {
    angular.module("RollingFood")
        .controller("ListController", ListController);

    function ListController(YelpService, RestaurantService, ReviewService, $routeParams, currentUser) {
        var model = this;
        model.getListTemplate = getListTemplate;
        model.user = currentUser;
        model.role = currentUser.role;
        model.isManager = false;

        function init() {
            if (model.role === "MANAGER") {
                model.isManager = true;
            }
            RestaurantService
                .findRestaurantByUserId(currentUser._id)
                .then(function (restaurants) {
                    model.restaurants = restaurants;
                });
        }

        init();

        function getListTemplate(role) {
            return "views/foodlist/template/list-user.view.client.html";
        }

        function findFoodByLocation(location) {
            return YelpService.findFoodByLocation(location).then(
                function (response) {
                    var queryResult = JSON.parse(response);
                    var businesses = queryResult["restaurants"];
                    model.businesses = businesses;
                }
            );
        }

        findFoodByLocation($routeParams.keyword);

        model.submitReview = submitReview;

        function submitReview(restaurantKey, reviewText) {
            if (currentUser === "0") {
                model.error = "Please login to proceed!";
            } else {
                var newReview = {
                    _user: currentUser.username,
                    restaurant: restaurantKey,
                    text: reviewText
                };
                ReviewService.createReview(newReview);
                model.reviews.push(newReview)
            }

        }

        model.fetchReview = fetchReview;

        function fetchReview(restaurantKey) {
            ReviewService.findReviewByRestaurant(restaurantKey).then(
                function (reviews) {
                    model.reviews = reviews;
                }
            )
        }
    }
})();