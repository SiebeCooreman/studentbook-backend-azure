const jwt = require('jsonwebtoken');
function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('No token in header' );
    }

    try {

        const token = authorization.split(' ')[1];
        const body = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.body.userId = body.userId;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        throw new Error(err);
    }

    return next();
}

export = {
    isAuthenticated
}
