(function () {
    angular
        .module("RollingFood", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "../views/admin/template/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/admin/user/:userId", {
                templateUrl: "../views/admin/template/admin-edit.view.client.html",
                controller: "AdminEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
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
            .when("/delivery", {
                templateUrl: "../views/order/template/order-list-delivery.view.client.html",
                controller: "OrderListDeliveryController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/manager", {
                templateUrl: "../views/order/template/order-list-manager.view.client.html",
                controller: "OrderListManagerController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/order/:orderId/assign", {
                templateUrl: "../views/order/template/order-assign-manager.view.client.html",
                controller: "OrderAssignManagerController",
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
                    currentUser: checkLoggedIn
                }
            })
            .when("/restaurant/:restaurantId", {
                templateUrl: "../views/restaurant/template/restaurant.edit.view.client.html",
                controller: "EditRestaurantController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
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
                controllerAs: "model"
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

})();