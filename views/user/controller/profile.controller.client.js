(function () {
    angular
        .module("RollingFood")
        .controller("ProfileController", ProfileController);

    function ProfileController(currentUser, $location, $rootScope, $routeParams, UserService) {
        var model = this;

        model.user = currentUser;
        var userId = currentUser._id;
        console.log("currentUser: " + userId);

        model.updateUser = updateUser;

        function init(){

        }
        init();

        function updateUser() {
            console.log(model.user.email);
            UserService
                .updateUser(model.user._id, model.user)
                .then(function () {
                    model.error = "Update Successfully."
                });
        }

    }
})();
