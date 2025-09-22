const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'notesData.json');

let notes = [];

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Load notes from file
function loadNotes() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    notes = JSON.parse(data);
  }
}

// Save notes to file
function saveNotes() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

// Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title.trim() && !content.trim()) {
    return res.status(400).json({ error: 'Cannot save an empty note.' });
  }
  const newNote = { title, content, timestamp: new Date().toISOString() };
  notes.unshift(newNote); // Add to the beginning for reverse chronological order
  saveNotes();
  res.status(201).json(newNote);
});

// Start server
app.listen(PORT, () => {
  loadNotes();
  console.log(`Server running at http://localhost:${PORT}`);
});
