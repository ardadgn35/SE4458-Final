const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ success: false, message: 'Forbidden. Admins only.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid token.' });
    }
};

module.exports = verifyAdmin;
