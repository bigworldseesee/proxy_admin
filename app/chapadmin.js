var pptp = require('nodepptp');

module.exports.addAccount = function(req, callback){
    console.log("adding " + req.body.account.username);
    pptp.users.add(req.body.account.username, 
	   	   'pptpd', 
		   req.body.account.password, 
		   '*', 
		   callback);
}

module.exports.deleteAccount = function(req, callback){
    console.log("deleting " + req.body.account.username);
    pptp.users.remove(req.body.account.username, callback);
}
