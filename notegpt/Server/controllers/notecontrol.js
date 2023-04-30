const Note = require('../models/notemodel');
const openai = require('openai');
const api_key = process.env.OPENAI_API_KEY;
openai.api_key = api_key;



module.exports = {
    // Retrieve all notes from the database
    async getNotes(req, res) {
        try {
            const notes = await Note.find();
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not retrieve notes' });
        }
    },


    // Create a new note in the database
    async createNote(req, res) {
        try {
            const { title, content } = req.body;
            const newNote = new Note({ title, content });

            Note.create({ title, content })
                .then((data) => {
                    console.log("Added succesfully")
                    console.log(data);
                    res.send({ ...data.toObject(), id: data._id });
                })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not create note' });
        }
    },





    // Delete a note from the database by ID
    async deleteNoteById(req, res) {
        try {
            const _id = req.params.id;
            const result = await Note.findByIdAndDelete(_id);
            if (!result) {
                return res.status(404).send({ message: 'Note not found' });
            }
            res.send({ message: 'Note deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error: could not delete note' });
        }
    },
};
