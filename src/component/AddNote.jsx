import React, { useState, useContext } from 'react';
import NoteContext from '../context/NoteContext';

const AddNote = () => {
    const { addNote } = useContext(NoteContext);
    const [newNote, setnewNote] = useState({});

    const onChangeAction = (event) => {
        setnewNote({
            ...newNote,
            [event.target.name]: event.target.value,
        })
    };

    const addNoteAction = (event) => {
        event.preventDefault();
        addNote(newNote);
    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name='title' onChange={onChangeAction} className="form-control" id="title" aria-describedby="titleHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name='description' onChange={onChangeAction} className="form-control" id="description" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNoteAction}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
