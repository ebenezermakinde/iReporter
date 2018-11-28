const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

module.exports = app;
