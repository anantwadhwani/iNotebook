import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const baseUrl = 'http://localhost:5000/api/note';
    const [noteContextState, setNoteContextState] = useState([]);
    const AuthToken = localStorage.getItem('token');

    // Fetch all Notes
    const fetchAllNotes = async () => {
            const fetchAllNotesResponse = await fetch(
                `${baseUrl}/fetchAllNotes`,
                {
                    method: 'GET',
                    headers: {
                        'Auth-Token': AuthToken,
                    }
                },
            );
            const fetchAllNotesJson = await fetchAllNotesResponse.json();            
            if(fetchAllNotesJson.statusMessage === 'failed') {
                return fetchAllNotesJson;;
            }
            setNoteContextState(fetchAllNotesJson);
    }

    // Add a Note
    const addNote = async (newNote) => {
        // API Call
        const response = await fetch(
            `${baseUrl}/addNote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': AuthToken,
                },
                body: JSON.stringify(newNote)
            },
        );
        const addedNote = await response.json();

        // Logic to edit in client side(update and siplay without calling a new api)
        setNoteContextState(noteContextState.concat(addedNote));
    };
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        await fetch(
            `${baseUrl}/deleteNote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Auth-Token': AuthToken,
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
                    'Auth-Token': AuthToken,
                },
                body: JSON.stringify(newNote)
            },
        );

        // Logic to edit in client side(update and siplay without calling a new api)
        const newNotes = noteContextState.map((note) => {
            if (note._id.toString() === id) {
                note.title = title ? title : note.title;
                note.description = description ? description : note.description;
                note.tag = tag ? tag : note.tag;
            }
            return note;
        });
        setNoteContextState(() => newNotes);
    }

    return (
        <NoteContext.Provider value={{ noteContextState, setNoteContextState, fetchAllNotes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
