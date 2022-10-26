// establish dependencies
const express = require('express');

// create an instance of express && create env port
const app = express();
const PORT = process.env.PORT || 3001;

// Express creates routes for all files in the public folder
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
