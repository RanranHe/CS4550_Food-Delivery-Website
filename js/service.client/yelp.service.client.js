(function() {
    angular
        .module("RollingFood")
        .factory("YelpService", YelpService);

    function YelpService($http) {
        return {
            "findFoodByLocation": findFoodByLocation
        };

        function findFoodByLocation(location, limit) {
            var url = "/api/yelp" + "?location=" + location + "&limit=" + limit;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }
})();