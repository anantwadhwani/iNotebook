import express from "express";
import fetchUser from "../middleware/fetchUser.mjs";
import Note from "../models/Note.mjs";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Route 1: Get all notes for a user after logging in using: GET "/api/note/fetchAllNotes"
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.json(notes);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Route 2: Add a note for a user after logging in using: POST "/api/note/addNote"
router.post(
    "/addNote",
    fetchUser,
    [
        body("title").exists(),
        body("description").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const tag = 'default';
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newNote = await Note({ userId: req.userId, ...req.body, tag });
            newNote
                .save()
                .then((note) => {
                    return res.status(200).json(note);
                })
                .catch(error => res.status(400).json(error.message));
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);

// Route 3: Update a note for a user after logging in using: PUT "/api/note/updateNote"
router.put("/updateNote/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        let note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({error: 'Note does not exist'});
        const newNote = {};
        newNote.title = title ? title : note.title;
        newNote.description = description ? description : note.description;
        newNote.tag = tag ? tag : note.tag;
        
        if(note.userId.toString() !== req.userId) {
            return res.status(401).json({error: 'Unauthorised'});
        }

        let updatedNote = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        return res.status(200).json(updatedNote);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Route 4: Delete a note for a user after logging in using: DELETE "/api/note/deleteNote"
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({error: 'Note does not exist'});
        
        if(note.userId.toString() !== req.userId) {
            return res.status(401).json({error: 'Unauthorised'});
        }

        note = await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({'Success': `${note.title} has been deleted`});

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
