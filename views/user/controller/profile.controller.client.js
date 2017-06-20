(function () {
    angular
        .module("RollingFood")
        .controller("ProfileController", ProfileController);

    function ProfileController(currentUser, $location, $rootScope, $routeParams, UserService) {
        var model = this;

        model.user = currentUser;
        var userId = currentUser._id;

        model.hasRole = true;
        if (currentUser.role === null || currentUser.role === undefined) {
            model.hasRole = false;
        } else {
            model.hasRole = true;
        }
        console.log(model.hasRole);


        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        if (model.user.role === 'USER') {
            model.message = "Welcome, Customer " + model.user.username + "!";
        }
        if (model.user.role === 'DELIVERYMAN') {
            model.message = "Welcome, Delivery Man " + model.user.username + "!"
        }
        if (model.user.role === "MANAGER") {
            model.message = "Welcome, Manager " + model.user.username + "!";
        }

        function updateUser() {
            UserService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    if (model.user.role !== null && model.user.role !== undefined) {
                        model.hasRole = true;
                    }
                    model.error = "Update Successfully.";
                    if (model.user.role === 'USER') {
                        model.message = "Welcome, Customer " + model.user.username + "!";
                    }
                    if (model.user.role === 'DELIVERYMAN') {
                        model.message = "Welcome, Delivery Man " + model.user.username + "!"
                    }
                    if (model.user.role === "MANAGER") {
                        model.message = "Welcome, Manager " + model.user.username + "!";
                    }
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(model.user._id)
                .then(function () {
                    $location.url("/login/");
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    })
        }
    }
})();
