// establish dependencies
const express = require('express');

// create an instance of express && create env port
const PORT = process.env.PORT || 3001;
const app = express();
// routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Express creates routes for all files in the public folder
app.use(express.static('public'));

// listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
