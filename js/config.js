(function () {
    angular
        .module("RollingFood", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "../views/user/template/user.login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "../views/main/template/mainpage.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "../views/user/template/user.register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/account", {
                templateUrl: "../views/foodlist/template/list-manager.view.client.html",
                controller: "ManagerAccountController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/restaurantNew", {
                templateUrl: "../views/restaurant/template/new.view.client.html",
                controller: "NewRestaurantController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn,
                    currentRestaurant:checkRestaurant
                }
            })
            .when("/profile", {
                templateUrl: "../views/user/template/user.profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/orderList", {
                templateUrl: "../views/order/template/order-list.view.client.html",
                controller: "OrderListController",
                controllerAs: "model"
            })
            .when("/orderNew", {
                templateUrl: "../views/order/template/order-new.view.client.html",
                controller: "NewOrderController",
                controllerAs: "model"
            })
            .when("/orderEdit", {
                templateUrl: "../views/order/template/order-edit.view.client.html",
                controller: "OrderEditController",
                controllerAs: "model"
            })
            .when("/list", {
                templateUrl: "../views/foodlist/template/list.view.client.html",
                controller: "ListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/menu", {
                templateUrl: "../views/foodlist/template/menu.view.client.html",
                controller: "MenuController",
                controllerAs: "model"
            })
    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkRestaurant($q, $location, RestaurantService) {
        var deferred = $q.defer();
        console.log("deferred" + deferred)
        RestaurantService
            .checkRestaurant()
            .then(function (currentRestaurant) {
                console.log("config currentRestaurant " + currentRestaurant)
                if (currentRestaurant === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentRestaurant);
                }
            });
        return deferred.promise;
    }

})();