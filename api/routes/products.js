const express = require("express");
const { ObjectId } = require("mongodb");
const { authenticate, authorize } = require("../middleware/auth");
const { getDB } = require("../db/connect");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await getDB().collection("products").find().toArray();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
});
router.get("/category/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const products = await getDB().collection("products").find({
            pCategory: { $regex: new RegExp(`^${category}$`, 'i') }
        }).toArray();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Error fetching products by category" });
    }
});
router.post("/", authenticate, authorize(["employee"]), async (req, res) => {
    try {
        const newProduct = req.body;

        if (!newProduct.pName || !newProduct.pCategory || !newProduct._price) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const result = await getDB().collection("products").insertOne(newProduct);

        res.status(201).json(result.insertedId);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Error adding product." });
    }
});

router.delete("/:id", authenticate, authorize(["employee"]), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getDB().collection("products").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
});

module.exports = router;
