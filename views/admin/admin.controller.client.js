(function () {
    angular
        .module("RollingFood")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var model = this;

        model.searchUser = searchUser;

        function searchUser(searchText) {
            UserService
                .searchUsers(searchText)
                .then(function (users) {
                    console.log("users: " + users)
                    model.users = users.data;
                })
        }
    }
})();