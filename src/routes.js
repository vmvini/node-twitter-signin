const Router = require('express').Router;
const api = Router();
const twitter = require('./twitterApi/apiFacade.js');
const httpUtils = require('./httpUtils.js');

module.exports = function (consumerKey, consumerSecret, oauth_callback, userHandler){
    twitter.init(consumerKey, consumerSecret, oauth_callback);
    registerRoutes(userHandler);
    return api;
};


function registerRoutes(userHandler){
    api.get('/twitter/signin', function(req, res, next){
        
        twitter
        .getRequestToken()
        .then(token=> httpUtils.sendSuccessResponse(res, { request_token: token})
            , err=> httpUtils.serverError(res, err));

    });

    api.get('/twitter/callback', function(req, res, next){

        twitter
        .getAccessToken(req.query.oauth_token, req.query.oauth_verifier)
        .then(token=>{
            twitter
            .getUserDetails(token)
            .then(user => {
                if(userHandler){
                    userHandler(user, token);
                }
                httpUtils.sendSuccessResponse(res, {});

            }, err => httpUtils.serverError(res, err));

        }, err => httpUtils.serverError(res, err));

    });
}


