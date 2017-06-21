(function() {
    angular
        .module("RollingFood")
        .factory("YelpService", YelpService);

    function YelpService($http) {
        return {
            "findFoodByLocation": findFoodByLocation,
            "findMenuByRestaurant": findMenuByRestaurant
        };

        function findFoodByLocation(location) {
            var url = "/api/yelp" + "?location=" + location;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findMenuByRestaurant(apiKey) {
            var url = "/api/yelp/menu" + "?apikey=" + apiKey;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }
})();