//fucntion to connect monogodb 
//use environment varible for mongodb url 
const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected ✅");
    } catch (error) {
        console.error("DB connection error ❌", error);
    }
}

module.exports = connectToDb;