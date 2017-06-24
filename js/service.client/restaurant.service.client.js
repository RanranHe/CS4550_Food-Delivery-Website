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
            "deleteRestaurant": deleteRestaurant,
            "insertFood": insertFood
        };

        function createRestaurant(userId, restaurant) {
            var url = "/api/project/user/" + userId + "/restaurant";
            return $http.post(url, restaurant).then(
                function(response) {
                    return response;
                }
            )
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
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            )
        }

        function updateRestaurant(restaurantId, newRestaurant) {
            var url = "/api/project/restaurant/" + restaurantId;
            return $http.put(url, newRestaurant);
        }

        function deleteRestaurant(restaurantId) {
            var url = "/api/project/restaurant/" + restaurantId;
            return $http.delete(url);
        }

        function insertFood(food, restaurantId) {
            var url = "/api/project/restaurant/insertFood/" + restaurantId;
            return $http.put(url, food);
        }
    }
})();
