(function() {
    angular.module("RollingFood")
        .controller("MenuController", MenuController);

    function MenuController(YelpService, CartService, RestaurantService, $routeParams) {
        var model = this;
        var isLocal = $routeParams.isLocal;
        if (isLocal === "true") {
            model.isLocal = true;
        } else {
            model.isLocal = false;
        }

        function findMenuByRestaurant(restaurantName, apiKey) {
            return YelpService.findMenuByRestaurant(apiKey).then(
                function(response) {
                    var queryResult = JSON.parse(response);
                    console.log(isLocal);
                    model.dishTypesApi = queryResult;
                    model.restaurantName = restaurantName;
                }
            );
        }

        if (model.isLocal) {
            RestaurantService.findRestaurantById($routeParams.key).then(
                function (response) {
                    console.log(response.food);
                    model.dishTypesLocal = response.food;});
        } else {
            findMenuByRestaurant($routeParams.restaurantName, $routeParams.apikey);
        }

        model.addToCart = addToCart;

        function addToCart(name, price) {
            CartService.addToCart(name, price);
        }
    }
})();