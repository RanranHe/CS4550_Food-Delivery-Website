(function () {
    angular
        .module("RollingFood")
        .controller("OrderListManagerController", OrderListManagerController);

    function OrderListManagerController($location, OrderService) {
        var model = this;

        model.cancelOrder = cancelOrder;
        model.assign = assign;

        function init() {
            OrderService
                .getAllOrders()
                .then(function(orders) {
                    model.orders = orders.data;
                })
        }
        init();

        function cancelOrder(orderId) {
            OrderService.findOrderById(orderId)
                .then(function (response) {
                    var order = response.data;
                    order.status = 'Cancelled';
                    OrderService.updateOrder(orderId, order);
                    location.reload();
                })
        }

        function assign(orderId) {
            $location.url("/order/" + orderId + "/assign")
        }
    }

})();