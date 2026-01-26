const express = require('express');
const mongoose = require('mongoose');
const v1Routes = require('./routes/v1/auth.route.cjs');

const app = express();

app.use(express.json());

// Connect to MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/test')

  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error:', err));

app.use('/v1', v1Routes);

app.listen(3000, () => {
    console.log(`LinkedInClone server listening on http://localhost:3000`);
});