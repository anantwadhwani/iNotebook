import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';

const NoteItem = (props) => {
    const {deleteNote} = useContext(NoteContext);
    const { note, setNoteToEdit, editNoteRef} = props;
    const { _id, title, description, tag } = note;

    const editNoteClick = () => {
        editNoteRef.current.click();
        setNoteToEdit({ eTitle: note.title, eDescription: note.description});
    }

    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{title}</h5>
                        <div className="ml-1">
                            <i className="fa-regular fa-pen-to-square ms-3" onClick={editNoteClick}></i>
                            <i className="fa-regular fa-trash-can ms-3" onClick={() => deleteNote(_id)}></i>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                    <span className="btn btn-primary">{tag}</span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
