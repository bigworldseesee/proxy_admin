// app/routes.js
var chapAdmin = require('./chapadmin');

module.exports = function(app, passport) {
    // ====================================
    // API Request =================
    // ====================================
    app.post('/addaccount', 
            passport.authenticate('basic-login', {session : false}),
            function(req, res) {
                console.log(req.body);
                chapAdmin.addAccount(req, function(result){
                    res.json({errCode : result});
                });
            }
    );

    app.post('/delaccount', 
            passport.authenticate('basic-login', {session : false}),
            function(req, res) {
                chapAdmin.deleteAccount(req, function(result){
                    res.json({errCode : result});
                });
            }
    );

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', isLoggedIn, function(req, res) {
        res.redirect('/admin'); // redirect to login page 
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('basic-login', {
        session : true,
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }
    ));

    // =====================================
    // Administration SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin.ejs', {
        });
    });

    app.post('/admin-add', isLoggedIn, function(req, res) {
        chapAdmin.addAccount(req, function(result){
            res.json({'success' : result});
        });
    });

    app.post('/admin-del', isLoggedIn, function(req, res) {
        chapAdmin.deleteAccount(req, function(result){
            res.json({'success' : result});
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    if(req.body && req.body.source === 'adminpage') {
        res.status(401).end();
    } else {
        res.redirect('/login');
    }
}

