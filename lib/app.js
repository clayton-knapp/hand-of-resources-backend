const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/guitars', require('./controllers/guitars'));

app.use('/api/v1/cars', require('./controllers/cars'));

app.use('/api/v1/subscribers', require('./controllers/subscribers'));

app.use('/api/v1/birthdates', require('./controllers/birthdates'));


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
