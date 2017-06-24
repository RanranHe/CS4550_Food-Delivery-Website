(function () {
    angular
        .module("RollingFood")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http) {
        return {
            "createRestaurant": createRestaurant,
            "findRestaurantById": findRestaurantById,
            "findRestaurantByUserId": findRestaurantByUserId,
            "updateRestaurant": updateRestaurant,
            "deleteRestaurant": deleteRestaurant
        };

        function createRestaurant(userId, restaurant) {
            var url = "/api/project/user/" + userId + "/restaurant";
            var data = {
                userId: userId,
                restaurant: restaurant
            };
            return $http.post(url, data)
        }

        function findRestaurantById(restaurantId) {
            var url = "/api/project/restaurant/" + restaurantId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRestaurantByUserId(userId) {
            var url = "/api/project/user/" + userId + "/restaurant";
            return $http.get(url);
        }

        function updateRestaurant(restaurantId, newRestaurant) {
            var url = "/api/project/restaurant/" + restaurantId;
            var data = {
                id: restaurantId,
                newReview: newRestaurant
            };
            return $http.put(url, data);
        }

        function deleteRestaurant(restaurantId) {
            var url = "/api/project/restaurant/" + restaurantId;
            return $http.delete(url);
        }
    }
})();
