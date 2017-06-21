(function() {
    angular.module("RollingFood")
        .controller("MenuController", MenuController);

    function MenuController(YelpService, $routeParams) {
        var model = this;

        function findMenuByRestaurant(restaurantName, apiKey) {
            console.log(restaurantName);
            return YelpService.findMenuByRestaurant(apiKey).then(
                function(response) {
                    var queryResult = JSON.parse(response);
                    model.dishTypes = queryResult;
                    model.restaurantName = restaurantName;
                }
            );
        }
        findMenuByRestaurant($routeParams.restaurantName, $routeParams.apikey);
    }
})();