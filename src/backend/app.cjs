const express = require('express');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const v1Routes = require('./routes/v1/auth.route.cjs');
const { jwtStrategy } = require('./config/passport.cjs');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your React dev server URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // Crucial for sending cookies/headers
}));

app.use(express.json());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 1000 })
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error:', err));

app.use('/v1', v1Routes);

app.listen(3000, () => {
  console.log(`LinkedInClone server listening on http://localhost:3000`);
});