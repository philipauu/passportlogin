    function local_routes(app, passport) {

        // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function (req, res) {
            res.render('pages/login.ejs', {
                message: req.flash('loginMessage')
            });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/login', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function (req, res) {
            res.render('pages/signup.ejs', {
                message: req.flash('loginMessage')
            });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

        // connecting locally --------------------------------
        app.get('/connect/local', function (req, res) {
            res.render('pages/connect-local.ejs', {
                message: req.flash('loginMessage')
            });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

        // unlink local -----------------------------------
        app.get('/unlink/local', function (req, res) {
            var user = req.user;
            user.local.email = undefined;
            user.local.password = undefined;
            user.save(function (err) {
                res.redirect('/profile');
            });
        });
    }

    module.exports = local_routes;