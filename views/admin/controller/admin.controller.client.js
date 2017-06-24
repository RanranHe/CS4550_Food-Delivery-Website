(function () {
    angular
        .module("RollingFood")
        .controller("AdminController", AdminController)
        .controller("AdminEditController", AdminEditController);

    function AdminController(UserService) {
        var model = this;

        model.searchUser = searchUser;

        function searchUser(searchText) {
            UserService
                .searchUsers(searchText)
                .then(function (users) {
                    model.users = users.data;
                })
        }
    }


    function AdminEditController($location, $routeParams, UserService) {
        var model = this;

        var userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            UserService.findUserById(userId)
                .then(function (user) {
                    model.user = user.data;
                })
        }
        init();

        function updateUser() {
            UserService
                .updateUser(userId, model.user);
            $location.url("/admin");
        }

        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function () {
                    $location.url("/admin");
                });
        }
    }
})();