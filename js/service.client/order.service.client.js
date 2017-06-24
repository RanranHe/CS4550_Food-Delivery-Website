(function() {
    angular.module("RollingFood")
        .factory("OrderService", OrderService);

    function OrderService($http) {
        return {
            "createOrder": createOrder,
            "findOrdersByUserId": findOrdersByUserId,
            "findOrdersByDeliveryManId": findOrdersByDeliveryManId,
            "findOrderById": findOrderById,
            "updateOrder": updateOrder
        };

        function createOrder(userId, order) {
            var url = "/api/project/user/" + userId + "/order";
            return $http.post(url, order).then(
                function(response) {
                   return response;
                }
            )
        }
        
        function findOrdersByUserId(userId) {
            var url = "/api/project/user/" + userId + "/order";
            return $http.get(url).then(
                function (orders) {
                    return orders;
                })
        }

        function findOrdersByDeliveryManId(deliveryManId) {
            var url = "/api/project/deliveryMan/" + deliveryManId + "/order";
            return $http.get(url).then(
                function (orders) {
                    return orders;
                })
        }

        function findOrderById(orderId) {
            var url = "/api/project/order/" + orderId;
            return $http.get(url).then(
                function(order) {
                    return order;
                }
            )
        }

        function updateOrder(orderId, order) {
            var url = "/api/project/order/" +　orderId;
            return $http.put(url, order).then(
                function(response) {
                    return response;
                }
            )
        }
    }
})();