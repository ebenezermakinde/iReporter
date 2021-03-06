// server.js
import express from 'express';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import routes from './routes';


const app = express();

app.use(express.json());

// parse application/json.
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

// set the process env port.
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

module.exports = app;
