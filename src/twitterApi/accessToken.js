const request = require('request');
const errors = require('./errors.js');
let _rdBuilder = null;

exports.setRequestDataBuilder = function(rdBuilder){
    _rdBuilder = rdBuilder;
}

exports.access_token = function(oauth_token, oauth_verifier){
    return new Promise ( (resolve, reject)=>{
        validate(reject);

        const requestData = _rdBuilder(oauth_token, oauth_verifier);

        request(requestData, function(error, response, body) {
            if(error){
                reject({
                    msg: errors.ACCESS_TOKEN_ERROR, 
                    details: error
                });
            }
            else{
                if(response.statusCode === 200){
                    resolve({
                        token: getToken(body), 
                        secret: getTokenSecret(body)
                    });
                }
                else{
                    reject({
                        msg: errors.ACCESS_TOKEN_ERROR, 
                        details: JSON.parse(body)
                    });
                }
            }
        });

    });

    function validate(reject){
        if(!oauth_token){
            reject({msg: errors.OAUTH_TOKEN_MISSING});
        }
        if(!oauth_verifier){
            reject({msg: errors.OAUTH_VERIFIER_MISSING});
        }
    }
};

function getTokenSecret(body){
    var array = body.split('&');
    var tokenSecretKeyValue = array[1];
    var tokenSecret = tokenSecretKeyValue.split('='); 
    return tokenSecret[1];
}

function getToken(body){
    var array = body.split('&');
    var token = array[0].split('=');
    return token[1];
}