var mongoose = require('mongoose');

 var userSchema = mongoose.Schema({
    username: String,
     password: String,
     firstName: String,
     lastName: String,
     dateCreated: {type: Date, default: Date.now()},
     role: String,
     income: Number
});
