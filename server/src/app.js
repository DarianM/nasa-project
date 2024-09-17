const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

// middleware chain
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

// morgan middleware, to log requests
// combined, it's a redefined format for the logger
app.use(morgan('combined'));

app.use(express.json());
// serve production build
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);

// serve index.html express to / root route
// home page
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;