(function () {
    angular.module("RollingFood")
        .controller("ListController", ListController);

    function ListController(YelpService, $routeParams) {
        var model = this;
        model.getListTemplate = getListTemplate;

        function getListTemplate(role) {
            switch (role) {
                case 'USER':
                    return "views/foodlist/template/list-user.view.client.html";
                case 'DELIVERYMAN':
                    return "views/foodlist/template/list-delivery.view.client.html";
                case "MANAGER":
                    return "views/foodlist/template/list-manager.view.client.html";
            }
        }

        function findFoodByLocation(location, limit) {
            return YelpService.findFoodByLocation(location, limit).then(
                function (response) {
                    var queryResult = JSON.parse(response);
                    var businesses = queryResult["businesses"];
                    model.businesses = businesses;
                }
            );
        }

        findFoodByLocation($routeParams.keyword, 20);
    }
})();