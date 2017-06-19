(function () {
    angular
        .module("RollingFood")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;

        // event handlers
        model.register = function (username, password, password2) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Invalid Empty Username!';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined'
                || password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Password cannot be empty!';
                return;
            }

            if (password !== password2) {
                model.error = "Passwords not match!";
                return;
            }

            UserService
                .findUserByUsername(username).then(
                function (found) {
                    if (found) {
                        model.error = "Username not available."
                    } else {
                        var newUser = {
                            username: username,
                            password: password
                        };

                        UserService
                            .createUser(newUser)
                            .then(function (res) {
                                console.log(res);
                                $location.url("/user/" + res.data.ops[0]._id);
                            });
                    }
                });
        }
    }
})();
