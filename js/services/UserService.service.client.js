(function () {
    angular
        .module("RushDelivery")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            "findUserByCredentials":  findUserByCredentials
        };
        return api;

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }
})();