(function () {
    angular
        .module("RollingFood")
        .controller("ProfileController", ProfileController);

    function ProfileController(currentUser, $location, UserService) {
        var model = this;

        model.user = currentUser;
        var userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        model.hasRole=false;

        if(model.user.role) {
            model.hasRole=true;
            if (model.user.role === 'USER') {
                model.message = "Welcome, Customer " + model.user.username + "!";
            }
            if (model.user.role === 'DELIVERYMAN') {
                model.message = "Welcome, Delivery Man " + model.user.username + "!"
            }
            if (model.user.role === "MANAGER") {
                model.message = "Welcome, Manager " + model.user.username + "!";
            }
        }

        function updateUser() {
            UserService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    if (!model.user.role) {
                        model.error = "Please select a role!";
                    } else {
                        model.hasRole=true;
                        if (model.user.role === 'USER') {
                            model.message = "Welcome, Customer " + model.user.username + "!";
                        }
                        if (model.user.role === 'DELIVERYMAN') {
                            model.message = "Welcome, Delivery Man " + model.user.username + "!"
                        }
                        if (model.user.role === "MANAGER") {
                            model.message = "Welcome, Manager " + model.user.username + "!";
                        }
                    }
                })
        }

        function deleteUser() {
            UserService
                .deleteUser(model.user._id)
                .then(function () {
                    $location.url("/login/");
                    location.reload();
                });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                        location.reload();
                    })
        }
    }
})();
