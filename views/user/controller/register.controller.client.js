(function () {
    angular
        .module("RollingFood")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;

        model.checkUsername = true;
        model.checkPassword1 = true;
        model.checkPassword2 = true;
        model.checkPasswordMatch = true;
        model.checkRole = true;


        // event handlers
        model.register = function (username, password, password2, role) {
            var usernameCheck = username === null || username === '' || username === undefined;
            var password1Check = password === null || password === '' || password === undefined;
            var password2Check = password2 === null || password2 === '' || password2 === undefined;
            var roleCheck = role === undefined;

            var checkArray = new Array(4);
            checkArray[0] = usernameCheck;
            checkArray[1] = password1Check;
            checkArray[2] = password2Check;
            checkArray[3] = roleCheck;

            if (usernameCheck || password1Check || password2Check || roleCheck) {
                $location.url("/register");
                var results = new Array(4);
                for (var i in checkArray) {
                    if (checkArray[i] === true) {
                        results[i] = false;
                    } else {
                        results[i] = true;
                    }
                }

                model.checkUsername = results[0];
                model.checkPassword1 = results[1];
                model.checkPassword2 = results[2];
                model.checkRole = results[3];
                if (password !== password2) {
                    model.checkPassword2 = true;
                    model.checkPasswordMatch = false;
                }
                return;
            }


            var found = null;//userService.findUserByUsername(username);

            UserService
                .findUserByUsername(username)
                .then(function (found) {
                    if (found !== null) {
                        model.error = "Username is not available";
                    } else {
                        if (role === "DELIVERYMAN") {
                            var user = {
                                username: username,
                                password: password,
                                role: role,
                                status: 'FREE'
                            };
                        } else {
                            var user = {
                                username: username,
                                password: password,
                                role: role
                            };
                        }
                    }
                    UserService
                        .register(user)
                        .then(function (user) {
                            $location.url('/profile');
                            location.reload();
                        });
                })
        }
    }
})();
