const Credentials = require('./credentials.js');
const oauthFacade = require('./oauthFacade.js');
const requestToken = require('./requestToken.js');
const accessToken = require('./accessToken.js');
const userDetails = require('./userDetails.js');
const requestDataBuilder = require('./requestDataBuilder.js');
let _credentials = null;

exports.init = function (consumerKey, consumerSecret, oauth_callback){
    _credentials = Credentials(consumerKey, consumerSecret, oauth_callback);
    oauthFacade.OAuthBuilder(_credentials);
    requestDataBuilder.setOAuthFacade(oauthFacade);

    requestToken.setRequestDataBuilder(requestDataBuilder.requestTokenRequestData);
    accessToken.setRequestDataBuilder(requestDataBuilder.accessTokenRequestData);
    userDetails.setRequestDataBuilder(requestDataBuilder.userDetailsRequestData);

};

exports.getRequestToken = function (){
    return requestToken.requestToken();
};

exports.getAccessToken = function (oauth_token, oauth_verifier){
    return accessToken.access_token(oauth_token, oauth_verifier);
};

exports.getUserDetails = function (token){
    return userDetails.getUserDetails(token);
};

