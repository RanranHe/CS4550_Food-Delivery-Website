(function () {
    angular.module("RollingFood")
        .factory("CartService", CartService);

    function CartService() {
        var cart = [];
        var totalPrice = 0;

        return {
            "addToCart": addToCart,
            "retrieveCart": retrieveCart,
            "getTotalPrice": getTotalPrice,
            "deleteItem": deleteItem,
            "emptyCart": emptyCart
        };

        function addToCart(name, price) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === name) {
                    var singlePrice = cart[i].price / cart[i].quantity;
                    cart[i].quantity += 1;
                    cart[i].price += singlePrice;
                    totalPrice += singlePrice;
                    return;
                }
            }
            cart.push({
                name: name,
                quantity: 1,
                price: price
            });
            totalPrice += price;
        }

        function retrieveCart() {
            return cart;
        }

        function getTotalPrice() {
            return totalPrice;
        }

        function deleteItem(name) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === name) {
                    cart[i].quantity -= 1;
                    if (cart[i].quantity === 0) {
                        totalPrice -= cart[i].price;
                        cart.splice(i, 1);
                    } else {
                        totalPrice -= (cart[i].price / cart[i].quantity);
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