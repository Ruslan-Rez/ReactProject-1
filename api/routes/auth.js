const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDB } = require("../db/connect");
require("dotenv").config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "Email, password, first name, and last name are required" });
    }

    try {
        // Check if the user already exists
        const db = getDB();
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user with first name, last name, and default role 'customer'
        const newUser = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: "customer", // Default role
        };

        const result = await db.collection('users').insertOne(newUser);

        res.status(201).json({ message: "Registration successful", userId: result.insertedId });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});



// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const db = getDB();
        const user = await db.collection("users").findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token,
            role: user.role,
            firstName: user.firstName,  // Add firstName here
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Error logging in user" });
    }
});

module.exports = router;
