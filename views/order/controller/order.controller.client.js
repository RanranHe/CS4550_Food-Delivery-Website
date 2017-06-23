(function () {
    angular
        .module("RollingFood")
        .controller("NewOrderController", NewOrderController)
        .controller("OrderListController", OrderListController);

    function NewOrderController(CartService, UserService, OrderService, $location) {
        var model = this;
        var foodNames = [];
        var falseFlag = false;

        function init() {
            model.cartItems = CartService.retrieveCart();
            model.totalPrice = CartService.getTotalPrice();
            for (var i = 0; i < model.cartItems.length; i++) {
                foodNames.push(model.cartItems[i].name);
            }
        }
        init();

        model.deleteItem = deleteItem;

        function deleteItem(name) {
            CartService.deleteItem(name);
            model.cartItems = CartService.retrieveCart();
        }

        model.addItem = addItem;

        function addItem(name) {
            CartService.addToCart(name, 0);
            model.cartItems = CartService.retrieveCart();
        }


        model.checkOut = checkOut;

        function checkOut() {
            UserService.checkLoggedIn().then(
                function(user) {
                    if (foodNames.length <= 0) {
                        model.error = "Please select at least one item!";
                        falseFlag = true;
                    }
                    if (model.address === "" || typeof model.address === "undefined") {
                        model.error = "Please enter your address!";
                        falseFlag = true;
                    }
                    if (model.name === "" || typeof model.name === "undefined") {
                        model.error = "Please enter your name!";
                        falseFlag = true;
                    }
                    if (model.cardNumber === "" || typeof model.cardNumber === "undefined") {
                        model.error = "Please enter your credit card number!";
                        falseFlag = true;
                    }
                    if (model.phone === "" || typeof model.phone === "undefined") {
                        model.error = "Please enter your phone number!";
                        falseFlag = true;
                    }
                    if (model.cardHolderName === "" || typeof model.cardHolderName === "undefined") {
                        model.error = "Please enter your credit card holder name!";
                        falseFlag = true;
                    }

                    if (model.cardExpireDate === "" || typeof model.cardExpireDate === "undefined") {
                        model.error = "Please enter your credit card expiration date!";
                        falseFlag = true;
                    }

                    if (!falseFlag) {
                        var newOrder = {
                            _user: user._id,
                            address: model.address,
                            foods: foodNames,
                            creditCard: model.cardNumber,
                            creditCardExpireDate: model.cardExpireDate,
                            creditCardHolder: model.cardHolderName,
                            name: model.name,
                            phone: model.phone,
                            totalPrice: CartService.getTotalPrice(),
                            dateCreated: {type: Date, default: Date.now()},
                            status: "Processing"
                        };
                        OrderService.createOrder(user._id, newOrder);
                        $location.url("/orderList")
                    }
                }
            );
        }
    }

    function OrderListController(OrderService, UserService) {
        var model = this;
        model.getListTemplate = getListTemplate;

        function getListTemplate(role) {
            switch (role) {
                case 'USER':
                    return "views/order/template/order-list-user.view.client.html";
                case 'DELIVERYMAN':
                    return "views/foodlist/template/order-list-delivery.view.client.html";
                case "MANAGER":
                    return "views/foodlist/template/order-list-manager.view.client.html";
            }
        }

        function init() {
            UserService.checkLoggedIn().then(
                function (user) {
                    OrderService.findOrdersByUserId(user._id).then(
                        function (orders) {
                            model.orders = orders.data;
                        }
                    )
                }
            )
        }
        init();
    }

})();
