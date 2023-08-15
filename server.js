const express = require('express');
const bodyParser = require('body-parser');
// const CharacterAI = require('node_characterai');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());


// Start the server
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

