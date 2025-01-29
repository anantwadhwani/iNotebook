import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteContext from '../context/note/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const { setAlert } = props;
    const navigate = useNavigate();
    const { noteContextState, fetchAllNotes, updateNote } = useContext(NoteContext);
    const [note, setNote] = useState({etitle: "", edescription: "", etag: ""});
    const ref = useRef(null);
    const updateRef = useRef(null);

    useEffect(() => {
        if(!localStorage.token) navigate('/login');
        fetchAllNotes();
        // eslint-disable-next-line
    }, []);

    const editNote = (currentNote) => {
        ref.current.click();
        setNote({eid: currentNote._id.toString(), etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleUpdateClick = (e)=>{
        updateNote({ id: note.eid, title: note.etitle, description: note.edescription, tag: note.etag });
        updateRef.current.click();
        setAlert({type: 'success', message: 'Note updated'});
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={updateRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdateClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {!noteContextState.length && <div className='container ms-2'>
                    Please add notes to display
                </div>}
                {noteContextState.map((note, index) => {
                    return <NoteItem key={note._id.toString()+index} updateNote={editNote} note={note} setAlert={setAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes;
