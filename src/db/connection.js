require('dotenv').config();
const mongoose = require('mongoose');


async function connect() {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successful connected")
    } catch (error) {
        console.log(error)
    };
};

connect();