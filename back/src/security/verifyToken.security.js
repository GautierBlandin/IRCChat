const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied! No token provided!');

    try {
        const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = verified;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Forbidden",
        });
    }
}