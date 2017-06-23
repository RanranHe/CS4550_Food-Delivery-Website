(function () {
    angular.module("RollingFood")
        .controller("ListController", ListController);

    function ListController(YelpService, $routeParams, currentUser) {
        var model = this;
        model.getListTemplate = getListTemplate;
        model.user = currentUser;
        model.role = currentUser.role;

        function getListTemplate(role) {
            console.log(role);
            switch (role) {
                case 'USER':
                    return "views/foodlist/template/list-user.view.client.html";
                case 'DELIVERYMAN':
                    return "views/foodlist/template/list-delivery.view.client.html";
                case "MANAGER":
                    return "views/foodlist/template/list-manager.view.client.html";
            }
        }

        function findFoodByLocation(location) {
            return YelpService.findFoodByLocation(location).then(
                function (response) {
                    var queryResult = JSON.parse(response);
                    var businesses = queryResult["restaurants"];
                    model.businesses = businesses;
                }
            );
        }
        findFoodByLocation($routeParams.keyword);
    }
})();