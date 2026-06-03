const mongoose = require("mongoose")

// Handle connection error events to prevent node process crash when MongoDB is offline
mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully...");
    } catch (err) {
        console.log(`Database Connected Failed: ${err}`);
    }
}   

module.exports = connectToDB