import React, { useContext, useEffect, useRef, useState } from 'react' 
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes,editNote} = context;

    const [note, setNote] = useState({id:"",title:"",description:"",tag:"deafult"})
    useEffect(() => {
        getNotes();
        //eslint-disable-next-line 
    }, [])

    const updateNote = (CurrentNote) => {
        ref.current.click();
        setNote(CurrentNote);
    }
    const ref = useRef(null)
    const refclose = useRef(null)

    const handleclick=(e)=>{
        refclose.current.click();
        editNote(note._id,note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value}) // any thing that changes should be replaced with the value which is in name  all others will be same as before
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="title" value={note.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" name='description' id="edescription" value={note.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name='tag' id="etag" value={note.tag} onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })}
            </div>
        </>

    )
}

export default Notes