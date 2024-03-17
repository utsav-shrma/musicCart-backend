const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ error: "Unauthorized User" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;