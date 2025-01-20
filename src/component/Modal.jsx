import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';

const Modal = (props) => {
    const { updateNote } = useContext(NoteContext);
    const { noteToEdit, setNoteToEdit, editNoteRef } = props;
    const onChangeAction = (event) => {
        console.log(event.target.value);
        // setNoteToEdit({...noteToEdit, [event.target.name]: event.target.value});
    }
    return (
        <>
            <button ref={editNoteRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch edit note modal
            </button>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="editTitle" className="form-label">Title</label>
                                <input type="text" name='editTitle' onChange={onChangeAction} className="form-control" id="editTitle" aria-describedby="titleHelp" value={noteToEdit.eTitle} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" name='editDescription' onChange={onChangeAction} className="form-control" id="editDescription" value={noteToEdit.eDescription} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={updateNote}>Update Note</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
