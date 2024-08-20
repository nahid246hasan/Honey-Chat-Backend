const createerror=require('http-errors');
function notFoundHandler(req, res, next) {  
    const error = createerror(404, 'Not Found');
    next(error);
}

function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === 'development' ? err: {message:err.message};
    res.status(err.status || 500);
    res.json(res.locals.error);
}

module.exports = {
    notFoundHandler,
    errorHandler
}