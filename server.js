const express = require("express");
const app = express();

app.get('/', (req, res) => res.send('HELLO_WORLD__'));

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));