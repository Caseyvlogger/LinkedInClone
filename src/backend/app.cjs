const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const v1Routes = require('./routes/v1/auth.route.cjs');

const app = express();

app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error:', err));

app.use('/v1', v1Routes);

app.listen(3000, () => {
    console.log(`LinkedInClone server listening on http://localhost:3000`);
});