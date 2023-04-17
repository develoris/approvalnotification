const AuthService = require('../services/authService');
const auth = new AuthService();
console.log('oauth2.middleware');
const addMiddleware = (req, res, next) => {
    req.oauth2 = auth;
    next()
}

module.exports = addMiddleware;