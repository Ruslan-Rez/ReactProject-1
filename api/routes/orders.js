const express = require("express");
const { ObjectId } = require("mongodb");
const { authenticate } = require("../middleware/auth");
const { getDB } = require("../db/connect");

const router = express.Router();

// Create a new order
router.post("/", authenticate, async (req, res) => {
    try {
        const { items, totalPrice, shippingAddress } = req.body;

        // Ensure required fields are present
        if (!items || !totalPrice || !shippingAddress) {
            return res.status(400).json({
                message: "Missing required fields.",
                missingFields: { items, totalPrice, shippingAddress },
            });
        }

        // Validate that items is an array and has at least one item
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items must be an array and cannot be empty." });
        }

        // Validate each item
        for (let item of items) {
            if (!item._id || !item.pName || !item._price || !item.quantity) {
                return res.status(400).json({
                    message: "Each item must have _id, pName, _price, and quantity fields.",
                    invalidItem: item,
                });
            }
        }

        // Use the 'new' keyword to create an ObjectId for userId
        const userId = new ObjectId(req.user._id);

        // Create a new order object
        const newOrder = {
            userId,
            items,
            totalPrice,  // Total price of the order
            shippingAddress,
            createdAt: new Date(),
            status: "Pending",
        };

        // Insert the order into the database
        const result = await getDB().collection("orders").insertOne(newOrder);

        // Respond with the order ID of the newly created order
        res.status(201).json({ orderId: result.insertedId });
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating order:", error);
        res.status(500).json({
            message: "Error creating order",
            error: error.message,
            stack: error.stack,  // Optional: Send the stack trace for debugging purposes (remove in production)
        });
    }
});

// Get orders for a user
router.get("/", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch orders for the authenticated user
        const orders = await getDB().collection("orders").find({ userId: new ObjectId(userId) }).toArray();

        res.json(orders);
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

module.exports = router;
