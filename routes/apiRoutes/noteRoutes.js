const router = require('express').Router();
const id = require('uuid');
const {
  createNewNote,
  validateNote,
  deleteNote,
  updateNotes,
} = require('../../lib/notes');
const { notes } = require('../../db/db.json');

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
  const results = notes;
  if (results) {
    res.json(results);
  } else {
    res.send(404);
  }
});

// create a new note
router.post('/notes', (req, res) => {
  // set unique id
  req.body.id = id.v4();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// delete a note
router.delete('/notes/:id', (req, res) => {
  const result = deleteNote(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// update a note
router.put('/notes/:id', (req, res) => {
  const result = updateNotes(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
