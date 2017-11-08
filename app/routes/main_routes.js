module.exports = function (app, passport) {
    console.log('loading routes');

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('pages/index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('pages/profile.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    var local_routes = require('./local_routes');
    local_routes(app, passport);

    var fb_routes = require('./fb_routes');
    fb_routes(app, passport);

    var google_routes = require('./google_routes');
    google_routes(app, passport);

    var twitter_routes = require('./twitter_routes');
    twitter_routes(app, passport);

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}