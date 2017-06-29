const request = require('request');
const errors = require('./errors.js');

let _rdBuilder = null;

exports.setRequestDataBuilder = function(rdBuilder){
    _rdBuilder = rdBuilder;
};

exports.getUserDetails = function (token){
    
    return new Promise( (resolve, reject ) => {
        validate(reject);
        const requestData = _rdBuilder(token);

        request( requestData , function(error, response, body) {
            if(error){
                reject({
                    msg: errors.VERIFY_CREDENTIALS_ERROR, 
                    details: error
                });
            }
            else{
                if(response.statusCode === 200){
                    resolve(JSON.parse(body)); //user details json
                }
                else{
                    reject({
                        msg: errors.VERIFY_CREDENTIALS_ERROR,
                        details: JSON.parse(body)
                    });
                }
                
            }
        });
    });

    function validate(reject){
        if(!token){
            reject({msg:errors.TOKEN_OBJ_MISSING});
        }
        if(!token.token){
            reject({msg:errors.OAUTH_TOKEN_MISSING});
        }
        if(!token.secret){
            reject({msg:OAUTH_TOKEN_SECRET_MISSING});
        }
    }

};