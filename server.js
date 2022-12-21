const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require('./config/db.js');
require('dotenv').config();

const app = express();
app.use(cookieParser());

connectDb();

app.use(express.json({ extended: false })) //body parser

app.get('/', (req, res) => res.send('HELLO_WORLD__'));
app.use('/api/test', require('./routes/test'));
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/item', require('./routes/item'));

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));