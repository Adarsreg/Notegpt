const Note = require('../models/notemodel');

module.exports = {
    // Retrieve all notes from the database
    async getAllNotes(req, res) {
        try {
            const notes = await Note.find({});
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not retrieve notes' });
        }
    },



    // Create a new note in the database
    async createNote(req, res) {
        const { title, description } = req.body;
        const newNote = new Note({ title, description });

        try {
            const savedNote = await newNote.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not create note' });
        }
    },

    // Delete a note from the database by ID
    async deleteNoteById(req, res) {
        try {
            const deletedNote = await Note.findByIdAndDelete(req.params.id);
            res.json(deletedNote);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not delete note' });
        }
    },
};