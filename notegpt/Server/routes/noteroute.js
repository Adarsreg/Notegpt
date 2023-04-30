const express = require('express');
const Note = require('../models/notemodel');
const openai = require('openai');
const router = express.Router();
const noteController = require("../controllers/notecontrol")


// GET a single note by ID
router.get('/notes', noteController.getNotes);

// POST a new note
router.post('/save', noteController.createNote);

// DELETE a note by ID
router.delete('/delete/:id', noteController.deleteNoteById);

module.exports = router;
