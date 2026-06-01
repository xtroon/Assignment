const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY || "your-secret-key");
        req.user = { id: decoded.userId }; // Make sure your JWT has userId
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = auth;
