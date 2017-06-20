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
                controller: "OrderController",
                controllerAs: "model"
            })
            .when("/orderNew", {
                templateUrl: "../views/order/template/order-new.view.client.html",
                controller: "OrderController",
                controllerAs: "model"
            })
            .when("/orderEdit", {
                templateUrl: "../views/order/template/order-edit.view.client.html",
                controller: "OrderController",
                controllerAs: "model"
            })
            .when("/list", {
                templateUrl: "../views/foodlist/template/list.view.client.html",
                controller: "ListController",
                controllerAs: "model"
            })
            .when("/menu", {
                templateUrl: "../views/foodlist/template/menu.view.client.html",
                controller: "ListController",
                controllerAs: "model"
            })
    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
                console.log("currentUser config: " + currentUser);
                if (currentUser === '0') {
                    // deferred.resolve(currentUser);
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();