const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const router = require('express').Router();

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post('/notes', (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  db.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
  res.json(db);
});

router.delete('/notes/:id', (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
  const newDb = db.filter((note) => note.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(newDb)
  );
  res.json(newDb);
});

module.exports = router;
