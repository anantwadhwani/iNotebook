import React, { useState, useContext } from 'react';
import NoteContext from '../context/note/NoteContext';

const AddNote = (props) => {
    const {setAlert} = props;
    const { addNote } = useContext(NoteContext);
    const [newNote, setnewNote] = useState({ title: '', description: '', tag: '' });

    const onChangeAction = (event) => {
        setnewNote({
            ...newNote,
            [event.target.name]: event.target.value,
        })
    };

    const addNoteAction = (event) => {
        event.preventDefault();
        addNote(newNote);
        setnewNote({ title: '', description: '', tag: '' });
        setAlert({type: 'success', message: 'Note added'});
    }

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={newNote.title} name='title' onChange={onChangeAction} className="form-control" id="title" aria-describedby="titleHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={newNote.description} name='description' onChange={onChangeAction} className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={newNote.tag} name='tag' onChange={onChangeAction} className="form-control" id="tag" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNoteAction}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
