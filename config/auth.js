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
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '391943635759-050sq0jduv1pb50t0t6n8q0meh6bkgbe.apps.googleusercontent.com',
        'clientSecret': 'TlLrNDeIWmgYRHWuDjW6wG4b',
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    },

    'spotifyAuth': {
        'clientID': '7a6d9c4143a24eb4b021e94fd6dbf20e',
        'clientSecret': 'fcfdd9eb6b514c43a459c26b9ae51dd6',
        'callbackURL': 'http://localhost:8080/auth/spotify/callback'
    },

    'instagramAuth': {
        'clientID': 'feb02e9e421847f3b7092526a3e07661',
        'clientSecret': '893832756afb4879a5ee6d08c9d737b0 ',
        'callbackURL': 'http://127.0.0.1:8080/auth/instagram/callback'
    }
};