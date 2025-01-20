import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const baseUrl = 'http://localhost:5000/api/note';
    const noteStateValue = [
        {
            "_id": "178a3dc73beb1f508d407bbf",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note1",
            "description": "Note1 description",
            "tag": "general",
            "date": "2025-01-17T11:23:51.768Z",
            "__v": 0
        },
        {
            "_id": "278a3dcd3beb1f508d407bc1",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note2",
            "description": "Note2 description",
            "tag": "general",
            "date": "2025-01-17T11:23:57.396Z",
            "__v": 0
        },
        {
            "_id": "378a3dc73beb1f508d407bbf",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note1",
            "description": "Note1 description",
            "tag": "general",
            "date": "2025-01-17T11:23:51.768Z",
            "__v": 0
        },
        {
            "_id": "478a3dcd3beb1f508d407bc1",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note2",
            "description": "Note2 description",
            "tag": "general",
            "date": "2025-01-17T11:23:57.396Z",
            "__v": 0
        },
        {
            "_id": "578a3dc73beb1f508d407bbf",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note1",
            "description": "Note1 description",
            "tag": "general",
            "date": "2025-01-17T11:23:51.768Z",
            "__v": 0
        },
        {
            "_id": "678a3dcd3beb1f508d407bc1",
            "userId": "678799514a99214bc13d96b0",
            "title": "Note2",
            "description": "Note2 description",
            "tag": "general",
            "date": "2025-01-17T11:23:57.396Z",
            "__v": 0
        }
    ];
    const [noteContextState, setNoteContextState] = useState(noteStateValue);

    // Fetch all Notes
    const fetchAllNotes = async () => {
        const allNotes = await fetch(
            `${baseUrl}/fetchAllNotes`,
            {
                method: 'GET',
                headers: {
                    'Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4Nzk5NTE0YTk5MjE0YmMxM2Q5NmIwIn0sImlhdCI6MTczNjk4MTI1N30.xxO_ktk75eJT5L_mrZCQrrTZndDGW9n_2uatdr0GZCI',
                }
            },
        );
        setNoteContextState(await allNotes.json());
    }

    // Add a Note
    const addNote = async (newNote) => {
        const { title, description } = newNote;
        // API Call
        await fetch(
            `${baseUrl}/addNote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4Nzk5NTE0YTk5MjE0YmMxM2Q5NmIwIn0sImlhdCI6MTczNjk4MTI1N30.xxO_ktk75eJT5L_mrZCQrrTZndDGW9n_2uatdr0GZCI',
                },
                body: JSON.stringify(newNote)
            },
        );

        // Logic to edit in client side(update and siplay without calling a new api)
        const note = {
            "_id": "678a3dcd3beb1f508d407bc1",
            "userId": "678799514a99214bc13d96b0",
            "title": title,
            "description": description,
            "tag": "general",
            "date": "2025-01-17T11:23:57.396Z",
            "__v": 0
        };
        setNoteContextState(noteContextState.concat(note));
    };
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        await fetch(
            `${baseUrl}/deleteNote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4Nzk5NTE0YTk5MjE0YmMxM2Q5NmIwIn0sImlhdCI6MTczNjk4MTI1N30.xxO_ktk75eJT5L_mrZCQrrTZndDGW9n_2uatdr0GZCI',
                }
            }
        );

        // Logic to edit in client side(update and siplay without calling a new api)
        const newNoteContextState = noteContextState.filter((note) => note._id !== id);
        setNoteContextState(newNoteContextState);
    }
    // Update a Note
    const updateNote = async (newNote) => {
        const { id, title, description, tag } = newNote;
        // API Call
        await fetch(
            `${baseUrl}/updateNote/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4Nzk5NTE0YTk5MjE0YmMxM2Q5NmIwIn0sImlhdCI6MTczNjk4MTI1N30.xxO_ktk75eJT5L_mrZCQrrTZndDGW9n_2uatdr0GZCI'
                },
                body: JSON.stringify(newNote)
            },
        );

        // Logic to edit in client side(update and siplay without calling a new api)
        noteContextState.forEach((note) => {
            if (note._id.toString() === id) {
                note.title = title ? title : note.title;
                note.description = description ? description : note.description;
                note.tag = tag ? tag : note.tag;
            }
        });
    }

    return (
        <NoteContext.Provider value={{ noteContextState, setNoteContextState, fetchAllNotes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
