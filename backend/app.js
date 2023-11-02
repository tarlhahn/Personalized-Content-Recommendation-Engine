// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

app.use(cors());

app.use('/api', apiRoutes);

// Global error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'An error occurred!' });
});

module.exports = app;

