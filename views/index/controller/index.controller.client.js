(function(){
    angular.module("RollingFood")
        .controller("IndexController", IndexController);

    function IndexController(UserService, CartService, $scope, $location) {
        var model = this;
        $scope.isLoggedIn = false;
        $scope.isManager = false;
        $scope.isDeliveryMan = false;
        $scope.isCustomer = false;


        function init() {
            UserService.checkLoggedIn().then(
                function(response) {
                    if (response !== '0') {
                        $scope.username = response.username;
                        $scope.isLoggedIn = true;
                        if (response.role === "MANAGER") {
                            $scope.isManager = true;
                            return;
                        }
                        if (response.role === "USER") {
                            $scope.isCustomer = true;
                            return;
                        }
                        if (response.role === "DELIVERYMAN") {
                            $scope.isDeliveryMan = true;
                            return;
                        }
                        if (response.role === "ADMIN") {
                            $scope.isAdmin = true;
                        } else {
                            $scope.hasRole = false;
                        }
                    }
                }
            );
        }
        init();

        $scope.cartItems = CartService.retrieveCart();
        $scope.deleteItem = deleteItem;

        function deleteItem(name) {
            CartService.deleteItem(name);
        }

        function logOut() {
            UserService.logout();
            $scope.isLoggedIn = false;
            $location.url("/");

        }

        $scope.logOut = logOut;
    }
})();