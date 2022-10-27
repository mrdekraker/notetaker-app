const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i += 1) {
    const note = notesArray[i];

    if (note.id === id) {
      notesArray.splice(i, 1);
      updateNotes(notesArray);
      break;
    }
  }
}

function updateNotes(notes) {
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes }, null, 2),
    (err) => {
      if (err) throw err;
      return true;
    }
  );
}

module.exports = {
  createNewNote,
  validateNote,
  deleteNote,
  updateNotes,
};
