const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.mrivhtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
//   run().catch(console.dir);






















// Routes
// app.post("/api/addresses", async (req, res) => {
//     const { address, category, details } = req.body;
//     try {
//         const newAddress = new Address({ address, category, details });
//         await newAddress.save();
//         res.status(200).json({ message: "Address saved!" });
//     } catch (error) {
//         res.status(500).json({ error: "Error saving address" });
//     }
// });

// app.get("/api/addresses", async (req, res) => {
//     try {
//         const addresses = await Address.find();
//         res.status(200).json(addresses);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching addresses" });
//     }
// });

// app.delete("/api/addresses/:id", async (req, res) => {
//     try {
//         await Address.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "Address deleted!" });
//     } catch (error) {
//         res.status(500).json({ error: "Error deleting address" });
//     }
// });

// Start Server

app.get("/", (req, res) => {
    res.send("mongoDB connected successfully");
  });
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  