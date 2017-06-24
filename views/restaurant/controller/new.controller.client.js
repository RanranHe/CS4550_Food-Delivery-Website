(function () {
    angular.module("RollingFood")
        .controller("NewRestaurantController", NewRestaurantController)
        .controller("EditRestaurantController", EditRestaurantController);

    function NewRestaurantController($location, RestaurantService, currentUser) {
        var model = this;
        model.user = currentUser;

        model.createRestaurant = createRestaurant;

        function init() {

        }

        function createRestaurant(name, address, city, state, zip, foodtype, phone, url) {
            var newRestaurant = {
                name: name,
                address: address,
                city: city,
                state: state,
                zip: zip,
                foodType: foodtype,
                phone: phone,
                url: url
            };
            RestaurantService
                .createRestaurant(currentUser._id, newRestaurant)
                .then(function(response) {
                    $location.url("/list");
                });
        }
    }

    function EditRestaurantController($location, RestaurantService, $routeParams) {
        var restaurantId = $routeParams['restaurantId'];
        var model = this;

        function init() {
            RestaurantService.findRestaurantById(restaurantId).then(
                function(restaurant) {
                    model.restaurant = restaurant;
                    model.foods = model.restaurant.food;
                }
            )
        }
        init();

        model.updateRestaurant = updateRestaurant;

        function updateRestaurant(restaurant) {
            console.log(restaurant);
            RestaurantService.updateRestaurant(restaurantId, restaurant);
            $location.url("/account")
        }

        model.addFood = addFood;

        function addFood(food) {
            var restaurantId = $routeParams['restaurantId'];
            RestaurantService.insertFood(food, restaurantId);
            location.reload();
        }

        model.removeItemInFoods = removeItemInFoods;

        function removeItemInFoods(name) {
            var item = model.foods.find(function(food) {
                return food.name === name;
            });
            var index = model.foods.indexOf(item);
            if (index > -1) {
                model.foods.splice(index, 1);
                updateItemsInFoods();
            }
        }

        model.updateItemsInFoods = updateItemsInFoods;
        function updateItemsInFoods() {
            model.restaurant.food = model.foods;
            RestaurantService.updateRestaurant(restaurantId, model.restaurant);
            location.reload();
        }

    }
})();
