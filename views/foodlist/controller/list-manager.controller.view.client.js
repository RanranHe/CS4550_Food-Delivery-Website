(function () {
    angular.module("RollingFood")
        .controller("ManagerAccountController", ManagerAccountController);

    function ManagerAccountController(RestaurantService, currentUser) {
        var model = this;

        model.user = currentUser;

        model.deleteRestaurant = deleteRestaurant;

        function init() {
            RestaurantService
                .findRestaurantByUserId(model.user._id)
                .then(function(restaurants) {
                    console.log(restaurants);
                    model.restaurants = restaurants.data;
                });
        }
        init();

        function deleteRestaurant() {
            RestaurantService
        }
    }
})();