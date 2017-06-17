(function () {
    angular
        .module("RollingFood", ["ngRoute"])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "../views/user/template/user.login.client.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "../views/main/template/mainpage.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "../views/user/template/user.register.client.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "../views/user/template/user.profile.client.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
    }

})();