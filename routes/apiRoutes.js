const path = require('path');
const fs = require('fs');

// npm package to generate unique ids
const { v4: uuidv4 } = require('uuid');

// routing
module.exports = (app) => {
  // GET /api/notes should read db.json and return all saved notes as JSON
  app.get(`/api/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `../db/db.json`));
  });

  // POST receives notes to save on the request body, adds to db.json, then returns new note to client
  app.post(`/api/notes`, (req, res) => {
    // read db.json
    const db = JSON.parse(
      fs.readFileSync(path.join(__dirname, `../db/db.json`), 'utf8')
    );

    // add unique id to note
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    // push new note to db.json
    db.push(newNote);
    fs.writeFileSync(`./db/db.json`, JSON.stringify(db));
    res.json(db);
  });

  // DELETE a note by id
  app.delete(`/api/notes/:id`, (req, res) => {
    // read db.json
    const db = JSON.parse(
      fs.readFileSync(path.join(__dirname, `../db/db.json`), 'utf8')
    );

    // filter out deleted note
    const deleteNote = db.filter((note) => note.id !== req.params.id);
    // rewrite db.json
    fs.writeFileSync(`./db/db.json`, JSON.stringify(deleteNote));
    res.json(deleteNote);
  });
};
