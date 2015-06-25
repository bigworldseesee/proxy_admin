var mongoose = require('mongoose');
var configDB = require('../config/database.js');
var User = require('../app/models/user');

mongoose.connect(configDB.url, function(err){
    if(err) throw err;
    console.log('connected ' + configDB.url);
});
var admin = new User();
admin.userip = '128.199.133.225';
admin.username = 'vpnadmin@bigworldseesee.com'
admin.password = admin.generateHash('VpnAdm!n2015');

admin.save(function(err){
    if(err) console.log(err);
    mongoose.disconnect();
});
