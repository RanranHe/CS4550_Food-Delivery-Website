(function () {
    angular
        .module("RushDelivery")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.login = function (username, password) {
            UserService.findUserByCredentials(username, password).then(login)

            function login(found) {
                if (found !== null) {
                    model.success = username + " is found!";
                } else {
                    model.message = "Username " + username + " not found!";
                }
            }
        };
    }
})();