class NotesApp {
  constructor() {
    this.notesKey = 'notesAppData';
    this.notes = this.loadNotes();
  }

  // Load notes from local storage
  loadNotes() {
    const storedNotes = localStorage.getItem(this.notesKey);
    return storedNotes ? JSON.parse(storedNotes) : [];
  }

  // Save notes to local storage
  saveNotes() {
    localStorage.setItem(this.notesKey, JSON.stringify(this.notes));
  }

  // Add a new note
  addNote(title, content) {
    if (!title.trim() && !content.trim()) {
      console.error('Cannot save an empty note.');
      return false;
    }
    const newNote = { title, content, timestamp: new Date().toISOString() };
    this.notes.unshift(newNote); // Add to the beginning for reverse chronological order
    this.saveNotes();
    return true;
  }

  // Get all notes
  getNotes() {
    return this.notes;
  }
}

// Example usage
const app = new NotesApp();
app.addNote('Sample Title', 'Sample Content');
console.log(app.getNotes());
