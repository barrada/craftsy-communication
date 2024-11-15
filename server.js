const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from the .env file
dotenv.config();

// Access environment variables using process.env
const port = process.env.PORT || 6000;

// Create the Express app
const app = express();

// Parse JSON request bodies
app.use(bodyParser.json());

// Routes
const communicationRoutes = require('./routes/communicationRoutes');
app.use('/api/communication', communicationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});