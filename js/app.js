module.exports = function(app) {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    mongoose.connect('mongodb://127.0.0.1/RollingFood');

    require('./services/UserService.service.server.js')(app);
};