(function(){
    angular.module("RollingFood")
        .controller("IndexController", IndexController);

    function IndexController(UserService, $scope, $location) {
        var model = this;
        $scope.isLoggedIn = false;

        function init() {
            UserService.checkLoggedIn().then(
                function(response) {
                    if (response !== '0') {
                        $scope.username = response.username;
                        $scope.isLoggedIn = true;
                    }
                }
            );
        }
        init();

        function logOut() {
            UserService.logout();
            $scope.isLoggedIn = false;
            $location.url("/");

        }

        $scope.logOut = logOut;
    }
})();