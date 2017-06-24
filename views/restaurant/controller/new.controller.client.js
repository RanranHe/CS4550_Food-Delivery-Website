(function () {
    angular.module("RollingFood")
        .controller("NewRestaurantController", NewRestaurantController);

    function NewRestaurantController($location, RestaurantService, currentUser, currentRestaurant) {
        var model = this;
        model.user = currentUser;

        model.createRestaurant = createRestaurant;
        model.restaurantId = currentRestaurant._id;
        console.log("model.currentRestaurant " + currentRestaurant)
        console.log("model.restaurantId " + model.restaurantId)

        function init() {

        }

        function createRestaurant(name, address, city, state, zip) {
            var newRestaurant = {
                name: name,
                address: address,
                city: city,
                state: state,
                zip: zip
            };
            var userId = model.user._id;
            RestaurantService
                .createRestaurant(userId, newRestaurant)
                .then(function() {
                    $location.url("/account")
                });
        }
    }
})();
