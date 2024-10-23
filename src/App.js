const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/task', require('./routes/task.js'))
app.use('/api/user', require('./routes/user.js'))

app.get('/', (req, res) => {
    res.send("HOLA")
})


module.exports = app;