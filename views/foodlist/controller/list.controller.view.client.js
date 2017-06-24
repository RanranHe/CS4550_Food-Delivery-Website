(function () {
    angular.module("RollingFood")
        .controller("ListController", ListController);

    function ListController(YelpService, RestaurantService, UserService, ReviewService, $routeParams) {
        var model = this;
        model.getListTemplate = getListTemplate;
        model.isManager = false;

        function init() {
            UserService.checkLoggedIn().then(function (currentUser) {
                model.user = currentUser;
                model.role = currentUser.role;

                if (model.role === "MANAGER") {
                    model.isManager = true;
                }
                if (model.user === "0") {
                    return;
                } else {
                    RestaurantService
                        .findRestaurantByUserId(model.user._id)
                        .then(function (restaurants) {
                            model.restaurants = restaurants;
                        });
                }
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
            if (model.user === "0") {
                model.error = "Please login to proceed!";
            } else {
                var newReview = {
                    _user: model.user.username,
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