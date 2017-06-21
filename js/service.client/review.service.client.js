(function () {
    angular
        .module("RollingFood")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        return {
            "createReview": createReview,
            "findReviewByRestaurant": findReviewByRestaurant,
            "login": login,
            "checkLoggedIn": checkLoggedIn,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout
        };

        function createReview(userId, review) {
            var url = "/api/project/user/" + userId + "/review";
            var data = {
                userId: userId,
                website: website
            };
            return $http.post(url, data)
        }
    }
});