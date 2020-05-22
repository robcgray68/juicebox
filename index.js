require('dotenv').config();

// inside index.js
const PORT = 3000;
const express = require('express');
const server = express();
const apiRouter = require('./api');

const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use('/api', apiRouter);

server.use(async (req, res, next) => {
  const prefix = 'Bearer '
  const auth = req.headers['Authorization'];

  if (!auth) {
    next(); // don't set req.user, no token was passed in
  }


  if (auth.startsWith(prefix)) {
    // recover the token
    const token = auth.slice(prefix.length);
    try {
      // recover the data
      const { id } = jwt.verify(data, 'secret message');

      // get the user from the database
      const user = await getUserById(id);
      // note: this might be a user or it might be null depending on if it exists

      // attach the user and move on
      req.user = user;

      next();
    } catch (error) {
      // there are a few types of errors here
    }
  }
})

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});