const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route1: Get All the Notes using get "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.Id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//Route2: Add a New Note using post "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }), //first is th field second is trhe error msg
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check for the email if it exists earlier
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({ title, description, tag, user: req.user.Id });
        const saveNote = await note.save();
        res.send(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//Route3: Update a existing Note using put "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //check for the email if it exists earlier
    try {
        const { title, description, tag } = req.body;
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag };

        //find the not to be updated and update it
        let note =await Notes.findById(req.params.id);
        //checking if note present with that id or not?
        if (!note) {
            return res.status(404).send("Not Found!")
        }
        //checking if the user logged in is the owner of that note or not?
        if (note.user.toString() !== req.user.Id) {
            return res.status(401).send("Not Allowed!")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

//Route4: Delete  existing Note using delete "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //check for the email if it exists earlier
    try {
        // const { title, description, tag } = req.body;
        //Create a newNote object

        //find the not to be updated and update it
        let note =await Notes.findById(req.params.id);
        //checking if note present with that id or not?
        if (!note) {
            return res.status(404).send("Not Found!")
        }
        //checking if the user logged in is the owner of that note or not?
        if (note.user.toString() !== req.user.Id) {
            return res.status(401).send("Not Allowed!")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ message:"success! This Node has been deleted!",note:note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

module.exports = router