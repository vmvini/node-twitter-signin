module.exports = function(consumerKey, consumerSecret, oauth_callback){

    if(!consumerKey){
        throw {msg: errors.CONSUMER_KEY_MISSING };
    }
    if(!consumerSecret){
        throw {msg: errors.CONSUMER_SECRET_MISSING };
    }
    if(!oauth_callback){
        throw {msg: errors.OAUTH_CALLBACK_MISSING};
    }

    return {
        consumerKey: consumerKey, 
        consumerSecret: consumerSecret, 
        oauth_callback: oauth_callback
    };

}