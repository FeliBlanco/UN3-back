const mongoose = require("mongoose");

async function connectDB() {
    await mongoose.connect('mongodb://feli:feliblancoo@ec2-18-206-120-192.compute-1.amazonaws.com:27017/piii?authSource=admin')
    console.log(`DB CONECTADA!`)
}

module.exports = connectDB;
