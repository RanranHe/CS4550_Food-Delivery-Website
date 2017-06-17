(function () {
    angular
        .module("RushDelivery", ["ngRoute"])
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
                controllerAs: "Model"
            })
    }

})();