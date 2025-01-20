import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import Modal from './Modal';

const Notes = () => {
    const editNoteRef = useRef(null);
    const { noteContextState, fetchAllNotes } = useContext(NoteContext);
    const [noteToEdit, setNoteToEdit] = useState({ eTitle: '', eDescription: ''});

    useEffect(() => {
        fetchAllNotes();
        //eslint-disable-next-line
    }, []);

    return (
        <div className='container my-3'>
            <h2>Your Notes</h2>
            <Modal noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} editNoteRef={editNoteRef} />
            <div className="row">
                {noteContextState?.map((note, index) => {
                    return <NoteItem key={note._id.toString()+index} note={note} setNoteToEdit={setNoteToEdit} editNoteRef={editNoteRef} />
                })}
            </div>
        </div>
    )
}

export default Notes
