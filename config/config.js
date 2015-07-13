module.exports = {
    port : 8080,
    database : {
        url : 'mongodb://localhost/bwss-vpnadmin',
    },
    express : {
        session : {
            secret : 'showmeareasontoletyouvpn',
            cookie : {
                maxAge : 600000
            },
            resave : true,
            saveUninitialized : true
        }
    },
};
