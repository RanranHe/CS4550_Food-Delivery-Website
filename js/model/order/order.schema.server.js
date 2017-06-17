var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    address: String,
    foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'foodlistModel'}],
    totalPrice: Number
});

module.exports = orderSchema;
