const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect('mongodb://feli:feliblanco@ec2-52-90-17-128.compute-1.amazonaws.com:27017/piii')
    console.log(`DB CONECTADA!`)
}

module.exports = connectDB;
