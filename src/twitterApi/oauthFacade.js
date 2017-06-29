const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');
const errors = require('./errors.js');
let _oauth = null;
let _credentials = {};

function setCredentials(credentials){
    _credentials = credentials;
    if(!_credentials.consumerKey){
        throw {msg: errors.CONSUMER_KEY_MISSING };
    }
    if(!_credentials.consumerSecret){
        throw {msg: errors.CONSUMER_SECRET_MISSING };
    }
}

exports.getCredentials = function (){
    return _credentials;
};

exports.createHeaders = function (requestData, token){
    return _oauth.toHeader(_oauth.authorize(requestData, token));
};

exports.OAuthBuilder = function (credentials){
    setCredentials(credentials);
    _oauth = OAuth({
        consumer: {
            key: _credentials.consumerKey,
            secret: _credentials.consumerSecret
        },
        signature_method: 'HMAC-SHA1',
        hash_function: function(base_string, key) {
            return crypto.createHmac('sha1', key).update(base_string).digest('base64');
        }
    });
};

