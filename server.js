const express = require("express");
const app = express();
const connectDb = require('./config/db.js');
require('dotenv').config();

connectDb();

app.use(express.json({ extended: false })) //body parser

app.get('/', (req, res) => res.send('HELLO_WORLD__'));
app.use('/api/test', require('./routes/test'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));