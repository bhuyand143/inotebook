import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST_URL;
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)
  //Fetching Nodes
  const getNotes=async()=>{
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    }); 
    const json=await response.json()
    setNotes(json);
  }

  //Add a note
  const addNote = async(title, description, tag) => {
    //Todo: Api call 
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    getNotes();
    const json =await response.json();
    console.log(json);

    // let note = {
    //   "_id": "63dfa126104d5b4e75ba4hl6",
    //   "user": "63d81ddb5db268602ae58934",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-02-07T02:49:36.550Z",
    //   "__v": 0
    // };
    // setNotes(notes.concat(json));
  }

  //Delete a note
  const deleteNote = async(id) => {
    //api call  
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const deleted=await response.json();
    getNotes();
    console.log(deleted);
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api Call
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);
    getNotes();
    //Logic for editing
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  }

  return (
    //value={{state,update}} is same as value={{state:state,update:update}}
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;


