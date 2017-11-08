module.exports = function (app, passport) {
    console.log('loading routes');

    // HOME PAGE (with login links) ========
    app.get('/', function (req, res) {
        console.log('loading homepage');
        res.render('index.ejs'); // load the index.ejs file
    });

    // show the login form
    app.get('/connect/login', function (req, res) {
        console.log('loading login');

        // render the page and pass in any flash data if it exists
        res.render('connect-login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function (req, res) {
        console.log('getting signup');

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/connect/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        console.log('rendering profile');
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/conect/facebook', passport.authorize('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/connect/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/connect/twitter', passport.authorize('twitter'), {
        scope: 'email'
    });

    // handle the callback after twitter has authenticated the user
    app.get('/connect/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/connect/google', passport.authorize('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
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
    res.redirect('/');
}