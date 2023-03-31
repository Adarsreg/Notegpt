const express = require('express')
const mongoose = require('mongoose')
const cors = require('mongoose')
const routes = require('./routes/noteroute')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const dburl = process.env.MONGO_URL;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.use(routes)
app.listen(port, () => console.log(`Listening on port ${port}`))

