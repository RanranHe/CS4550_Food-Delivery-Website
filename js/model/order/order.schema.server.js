var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'userModel'},
    address: String,
    foods: [String],
    totalPrice: Number,
    status: {type: String, enum: ['Processing', 'OnTheWay', 'Cancelled']}
});

module.exports = orderSchema;
