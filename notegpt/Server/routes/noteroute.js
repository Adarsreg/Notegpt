const express = require('express');
const Note = require('../models/notemodel');

const router = express.Router();
const noteController = require("../controllers/notecontrol")
router.get('/', (req, res) => {
    res.json({ message: "Hello world" })
})

// GET a single note by ID
//router.get('/:id', noteController.getNoteById);

// POST a new note
router.post('/save', noteController.createNote);

// DELETE a note by ID
router.delete('/:id', noteController.deleteNoteById);

module.exports = router;
