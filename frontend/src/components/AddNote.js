import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert('Note Added Successfully!','success');
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) // any thing that changes should be replaced with the value which is in name  all others will be same as before
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} placeholder={"Give a title (Minimum 3 letters)"} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" name='description' value={note.description} id="description" onChange={onChange} placeholder={"Provide Description here (Minimum 5 letters)"} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} name='tag' id="tag" onChange={onChange} placeholder='Provide a tag e.g. General' required />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote