(function () {
    angular
        .module("RollingFood")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;
        model.checkUsername = true;
        model.checkPassword = true;

        model.login = function (username, password) {
            model.checkUsername = true;
            model.checkPassword = true;
            if ((username === "" || username === undefined || username === null)
                && (password === "" || password === undefined || password === null)) {
                model.checkUsername = false;
                model.checkPassword = false;
                return;
            }
            if (username === "" || username === undefined || username === null) {
                model.checkUsername = false;
                return;
            }
            if (password === "" || password === undefined || password === null) {
                model.checkPassword = false;
                return;
            }

            UserService
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();