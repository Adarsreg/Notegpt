const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/noteroute')

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;
const dburl = process.env.MONGODB_URL;
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))

    .catch(err => console.log(err))

app.use(routes)
app.listen(port, () => console.log(`Listening on port ${port}`))



