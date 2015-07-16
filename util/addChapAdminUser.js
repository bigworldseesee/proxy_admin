var mongoose = require('mongoose');
var config = require('../config/config.js');
var User = require('../app/models/user');

var conn = mongoose.connect(config.database.url, function(err){
    if(err) throw err;
    console.log('connected ' + config.database.url);

    var upload = function() {
        var admin = new User();
        admin.username = config.auth.username;
        admin.password = admin.generateHash(config.auth.password);

        admin.save(function(err){
            if(err) console.log(err);
            mongoose.disconnect();
        });
    }

    User.remove(function(err) {
        if(err) {
            console.log(err);
            mongoose.disconnect();
            throw err;
        }
        upload();
    });
});
