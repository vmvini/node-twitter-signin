exports.missingParameter = function (res, data){
    response(400, res, data);
};

exports.forbidden = function (res, data){
    response(403, res, data);
};

exports.notFound = function (res, data){
    response(404, res, data);
};

exports.authError = function (res, data){
    response(401, res, data);
};

exports.serverError = function (res, data){
    response(500, res, data);
};

exports.sendSuccessResponse = function (res, data){
    response(200, res, data);
};

function response(code, res, data){
    res.status(code);
    res.json(data);
}