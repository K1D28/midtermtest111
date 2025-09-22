const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// File path for storing notes
const NOTES_FILE = path.join(__dirname, 'notes.json');

// Load notes from file or initialize an empty array
function loadNotes() {
  if (fs.existsSync(NOTES_FILE)) {
    const data = fs.readFileSync(NOTES_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

// Save notes to file
function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

// In-memory notes array
let notes = loadNotes();

// API to get all notes (reverse chronological order)
app.get('/notes', (req, res) => {
  res.json(notes.sort((a, b) => b.timestamp - a.timestamp));
});

// API to add a new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const newNote = { title, content, timestamp: Date.now() };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
