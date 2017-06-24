(function () {
    angular
        .module("RollingFood")
        .factory("UserService", UserService);

    function UserService($http) {
        return {
            "register": register,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "checkLoggedIn": checkLoggedIn,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout,
            "searchUsers": searchUsers
        };

        //////////////// Register ///////////////
        function register(user) {
            var url = "/api/project/register";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        /////////////// Login ///////////////////
        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http
                .post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //////////////////////////////////////
        function findUserById(userId) {
            return $http.get("/api/project/user/"+ userId);
        }

        function updateUser(userId, newUser) {
            var url = "/api/project/user/" + userId;
            var data = {
                id: userId,
                newUser: newUser
            };
            return $http.put(url, data);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function searchUsers(searchText) {
            return $http.get("/api/project/search?searchText="+searchText);
        }
    }
})();