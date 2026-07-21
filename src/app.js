const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express',
    status: 'ok'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

module.exports = app;
