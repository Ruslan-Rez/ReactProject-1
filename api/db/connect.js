const { MongoClient } = require("mongodb");
require("dotenv").config();

const CONNECTION_STRING= process.env.CONNECTION_STRING;
const DATABASE_NAME = "steamstudio";

const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

async function connectToMongoDB() {
    try {
        await client.connect();
        database = client.db(DATABASE_NAME);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!database) {
        throw new Error("Database not initialized. Call connectToMongoDB first.");
    }
    return database;
}

module.exports = { connectToMongoDB, getDB };
