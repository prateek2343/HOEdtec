const jwt = require('jsonwebtoken');

const addClaimsFromToken = (req, res, next) => {

    const token = req.headers.at || '';

    if (token) {
        const claims = jwt.decode(token);
        req.headers['claims'] = claims;
        req.headers.claims['admin'] = claims;
        next();
    } else {
        // No token provided
        return res.status(400).json({ message: 'Invalid request headers' })
    }
}

module.exports = addClaimsFromToken