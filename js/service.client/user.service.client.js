(function () {
    angular
        .module("RollingFood")
        .factory("UserService", UserService);

    function UserService($http) {
        return {
            "findUserByCredentials":  findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "register": register,
            "createUser": createUser
        };

        //////////////// Register ///////////////
        function register(user) {
            console.log("here");
            var url = "/api/project/security/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        /////////////////////////////////////////
        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http
                .post(url, user);
            // .then(function (response) {
            //     return response.data;
            // });
        }


    }
})();