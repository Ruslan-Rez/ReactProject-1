const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./db/connect");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

});
