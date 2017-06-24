(function () {
    angular.module("RollingFood")
        .controller("ManagerAccountController", ManagerAccountController);

    function ManagerAccountController(RestaurantService, currentUser, $location) {
        var model = this;

        model.user = currentUser;

        model.deleteRestaurant = deleteRestaurant;
        model.updateRestaurant = updateRestaurant;


        function init() {
            RestaurantService
                .findRestaurantByUserId(currentUser._id)
                .then(function(restaurants) {
                    model.restaurants = restaurants;
                });
        }
        init();

        function deleteRestaurant(restaurant_id) {
            RestaurantService.deleteRestaurant(restaurant_id);
            $location.url("/account");
        }

        function updateRestaurant(restaurant_id) {
            $location.url("/restaurant/" + restaurant_id);
        }
    }
})();