(function () {
    angular.module("RollingFood")
        .controller("NewRestaurantController", NewRestaurantController);

    function NewRestaurantController(RestaurantService, currentUser) {
        var model = this;
        model.user = currentUser;

        model.createRestaurant = createRestaurant;

        function createRestaurant(name, address, city, state, zip) {
            var newRestaurant = {
                name: name,
                address: address,
                city: city,
                state: state,
                zip: zip
            };
            var userId = model.user._id;
            RestaurantService.createRestaurant(userId, newRestaurant);
        }
    }
})();
