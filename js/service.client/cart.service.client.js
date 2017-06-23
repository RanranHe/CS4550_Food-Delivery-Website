(function () {
    angular.module("RollingFood")
        .factory("CartService", CartService);

    function CartService() {
        var cart = [];

        return {
            "addToCart": addToCart,
            "retrieveCart": retrieveCart,
            "deleteItem": deleteItem,
            "emptyCart": emptyCart
        };

        function addToCart(name) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === name) {
                    cart[i].quantity += 1;
                    return;
                }
            }
            cart.push({
                name: name,
                quantity: 1
            });
        }

        function retrieveCart() {
            return cart;
        }

        function deleteItem(name) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === name) {
                    cart[i].quantity -= 1;
                    if (cart[i].quantity === 0) {
                        cart.splice(i, 1);
                    }
                    return;
                }
            }
        }

        function emptyCart() {
            cart = [];
        }
    }
})();