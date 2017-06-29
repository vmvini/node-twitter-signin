const request = require('request');
const errors = require('./errors.js');

let _rdBuilder = null;

exports.setRequestDataBuilder = function(rdBuilder){
    _rdBuilder = rdBuilder;
};

exports.requestToken = function (){
    
    const requestData = _rdBuilder();
    
    return new Promise( (resolve, reject) => {
        request(requestData, function(error, response, body) {
            if(error){
                reject({
                    msg: errors.REQUEST_TOKEN_ERROR, 
                    details: error
                });
            }
            else{
                if( response.statusCode === 200){
                    resolve(getToken(body));
                }
                else{
                    reject({
                        msg: errors.REQUEST_TOKEN_ERROR, 
                        details: JSON.parse(body)
                    });
                }
            }
        });
    });
};

function getToken(body){
    var array = body.split('&');
    var oauthPart = array[0].split('=');
    return oauthPart[1];
}