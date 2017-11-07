module.exports = {

    'facebookAuth': {
        'clientID': '1460008627369901', // your App ID
        'clientSecret': '234313a44c91e8a0a07d60f0df601c48', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback',
        'profileFields': ["email", "displayName", "name", "photos"]
    },

    'twitterAuth': {
        'consumerKey': '5Ly3IphzGqR2a3sQspCdtOrLJ',
        'consumerSecret': 'qAm0GuS8O2KieKt2EfmlHTsozud3n3EsOlaje9pkv2BLEalsBV',
        'callbackURL': 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'consumerKey': '391943635759-050sq0jduv1pb50t0t6n8q0meh6bkgbe.apps.googleusercontent.com',
        'consumerSecret': 'TlLrNDeIWmgYRHWuDjW6wG4b',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }
};