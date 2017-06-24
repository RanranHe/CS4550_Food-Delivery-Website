var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    _deliveryMan:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    _user: String,
    address: String,
    foods: [String],
    creditCard: Number,
    creditCardHolder: String,
    creditCardExpireDate: String,
    name: String,
    totalPrice: Number,
    phone: String,
    date: {type: Date, default: Date.now()},
    status: {type: String, enum: ['Processing', 'OnTheWay', 'Cancelled', 'Completed']}
}, {collection: "RollingFoodDelivery.orders"});

module.exports = orderSchema;
