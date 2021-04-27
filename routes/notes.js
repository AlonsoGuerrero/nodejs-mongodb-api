const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Get all the notes
router.get('/', async(req, res) => {
    try {
        const allNotes = await Note.find();
        res.send(allNotes);
    } catch (err) {
        res.send(err);
    }
})

// Get a specific note
router.get('/:noteId', async(req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        res.send(note);
    } catch (err) {
        res.send(err);
    }
})

// Insert a note
router.post('/', async(req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (err) {
        res.send(err);
    }

    /* Using promise
    post.save()
        .then(data => res.send(data))
        .catch(err => res.send(err))
    */
})

// Update a note
router.patch('/:noteId', async(req, res) => {
    try {
        const updatedNote = await Note.updateOne({ _id: req.params.noteId }, { $set: { title: req.body.title } });
        res.send(updatedNote);
    } catch (err) {
        res.send(err);
    }
})

// Delete a post
router.delete('/:noteId', async(req, res) => {
    try {
        const removedNote = await Note.deleteOne({ _id: req.params.noteId });
        res.send(removedNote);
    } catch (err) {
        res.send(err);
    }
})


module.exports = router;