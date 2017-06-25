(function () {
    angular
        .module("RollingFood")
        .controller("AdminController", AdminController)
        .controller("AdminEditController", AdminEditController);

    function AdminController(UserService) {
        var model = this;

        model.searchDone = false;

        function init() {
            UserService.findAllUsers()
                .then(function (users) {
                    model.users = users.data;
                });
        }
        init();


        model.searchUser = searchUser;

        function searchUser(searchText) {
            model.searchDone = true;
            UserService
                .searchUsers(searchText)
                .then(function (results) {
                    model.results = results.data;
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