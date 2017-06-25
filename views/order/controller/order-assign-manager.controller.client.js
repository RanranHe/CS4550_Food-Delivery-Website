(function () {
    angular
        .module("RollingFood")
        .controller("OrderAssignManagerController", OrderAssignManagerController);

    function OrderAssignManagerController($routeParams, $location, UserService, OrderService) {
        var model = this;

        model.orderId = $routeParams['orderId'];
        model.assignOrder = assignOrder;

        function init() {
            UserService
                .findFreeDeliveryMan()
                .then(function(deliveryMans) {
                    model.deliveryMans = deliveryMans.data;
                })
        }
        init();

        function assignOrder(deliveryManId) {
            UserService.findUserById(deliveryManId)
                .then(function (response) {
                    var deliveryMan = response.data;
                    deliveryMan.status = 'BUSY';
                    UserService.updateUser(deliveryManId, deliveryMan);
                    OrderService.findOrderById(model.orderId)
                        .then(function (order) {
                            var newOrder = order.data;
                            newOrder.status = 'Pickup';
                            newOrder._deliveryMan = deliveryManId;
                            OrderService.updateOrder(model.orderId, newOrder)
                                .then(function() {
                                    $location.url("/manager")
                                })
                        });
                })
        }
    }

})();
