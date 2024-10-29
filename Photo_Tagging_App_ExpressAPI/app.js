const express = require('express');
require('dotenv').config()
const cors = require('cors');
const router = require('./Routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`express app listening to port ${PORT}`))