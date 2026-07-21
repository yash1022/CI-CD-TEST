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

app.get('/home',(req,res)=>{
    res.json({
        message:"WELCOME TO THE HOME PAGE",
        status:'ok'
    })
})

module.exports = app;
