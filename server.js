const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for scores
const scores = {};

// Serve main.html as the default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Endpoint to get scores
app.get('/scorecard/data', (req, res) => {
  res.json(scores);
});

// Endpoint to update scores
app.post('/scorecard/update', express.json(), (req, res) => {
  const { teamName, points } = req.body;
  if (!scores[teamName]) {
    scores[teamName] = 0;
  }
  scores[teamName] += points;
  res.status(200).send('Score updated');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
