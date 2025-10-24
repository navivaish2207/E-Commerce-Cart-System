const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve API routes
app.use('/api/cart', cartRoutes);

// Serve client folder as static files
app.use(express.static(path.join(__dirname, '../client')));

// Optional: redirect '/' to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
