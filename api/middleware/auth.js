const jwt = require("jsonwebtoken");
const { getDB } = require("../db/connect");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication Middleware
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await getDB().collection("users").findOne({ _id: new ObjectId(decoded.id) });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

// Authorization Middleware
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
