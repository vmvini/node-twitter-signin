let _oauth = null;
let _credentials = null;
const errors = require('./errors.js');

exports.setOAuthFacade = function(oauth) {
    _oauth = oauth;
    _credentials = _oauth.getCredentials();
};

exports.accessTokenRequestData = function(oauth_token, oauth_verifier) {
    const url = 'https://api.twitter.com/oauth/access_token';
    const method = 'POST';
    return requestDataBuilder(url, method, {
        oauth_token: oauth_token,
        oauth_verifier: oauth_verifier
    }, true);
};

exports.requestTokenRequestData = function() {
    if (!_credentials) {
        throw { msg: errors.CREDENTIALS_MISSING };
    }
    if (!_credentials.oauth_callback) {
        throw { msg: errors.OAUTH_CALLBACK_MISSING };
    }
    const url = "https://api.twitter.com/oauth/request_token";
    const method = "GET";
    return requestDataBuilder(url, method, {
        oauth_callback: _credentials.oauth_callback
    }, false);
};

exports.userDetailsRequestData = function(token) {
    const url = "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true";
    const method = "GET";
    return requestDataBuilder(url, method, {
        oauth_token: token.token,
        oauth_token_secret: token.secret
    }, false, token);
};

function requestDataBuilder(url, method, data, hasForm, token) {

    validate();

    const rd = {
        url: url,
        method: method,
        data: data
    };

    let form = {};
    if (hasForm) {
        form = data;
    }

    return {
        url: rd.url,
        method: rd.method,
        form: form,
        headers: _oauth.createHeaders(rd, token)
    };

    function validate() {
        if (!_oauth) {
            throw {
                msg: errors.OAUTH_FACADE_MISSING
            };
        }
        if (!url) {
            throw {
                msg: errors.MISSING_URL_PARAMETER
            };
        }
        if (!method) {
            throw {
                msg: errors.MISSING_METHOD_PARAMETER
            }
        }
    }
}