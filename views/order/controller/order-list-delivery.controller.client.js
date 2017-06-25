(function () {
    angular
        .module("RollingFood")
        .controller("OrderListDeliveryController", OrderListDeliveryController);

    function OrderListDeliveryController($location, OrderService, currentUser) {
        var model = this;
        model.deliveryManId = currentUser._id;
        model.updateStatus = updateStatus;

        function init() {
            OrderService
                .findOrdersByDeliveryManId(model.deliveryManId)
                .then(function(orders) {
                    model.orders = orders.data;
                })
        }
        init();

        function updateStatus(orderId, status) {
            OrderService.findOrderById(orderId)
                .then(function (response) {
                    var order = response.data;
                    order.status = status;
                    OrderService.updateOrder(orderId, order)
                        .then(function () {
                            location.reload();
                        })
                })
        }
    }

})();
