require('dotenv').config()

const app = require('./src/App');
const connectDB = require('./src/db');

const PORT = process.env.PORT;

connectDB()


app.listen(PORT, console.log(`Server en puerto ${PORT}`))