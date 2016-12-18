// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiMiddleware = require('./api-middleware');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiMiddleware);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT);
});