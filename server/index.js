
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://travel-agency:MqUlc8f8jwb6KVvk@cluster0.mrivhtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let packageCollection; 
let userCollection;

async function connectToDB() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        console.log("Connected to MongoDB!");




        //  ALL COLLECTION
        const allPackagesDB = client.db("allpackageData");
        packageCollection = allPackagesDB.collection('packageCollection');
        userCollection = allPackagesDB.collection('userCollection');
        // -------------------------------------------------------------------------------------

        // ALL PACKAGES

        // get method
        app.get("/allpackages", async (req, res) =>{
            const packagesCursor = packageCollection.find(); 
        const packages = await packagesCursor.toArray();
        res.send(packages)
        })


    // ------------------------------------------------------------------------------------------
        // ALL USER DETAILS


        // post method
        app.post('/userdetail' , async( req , res)=>{
            const userDetails = req.body
            const result = await userCollection.insertOne(userDetails)
            res.send(result)
        })



    }
    
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}





app.get("/", (req, res) => {
    res.send("MongoDB connected successfully");
});



// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectToDB(); // Ensure MongoDB connection is established before starting the server
    console.log(`Server running on port ${PORT}`);
});
