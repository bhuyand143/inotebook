import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "63dfa126104d5b4e75ba4cb0",
          "user": "63d81ddb5db268602ae58934",
          "title": "My Title",
          "description": "Basic Notes!",
          "tag": "Personal",
          "date": "2023-02-05T12:29:26.550Z",
          "__v": 0
        },
        {
          "_id": "63dfa145104d5b4e75ba4cb2",
          "user": "63d81ddb5db268602ae58934",
          "title": "Second Note",
          "description": "Nothing is permanent!",
          "tag": "Personal",
          "date": "2023-02-05T12:29:57.281Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        //value={{state,update}} is same as value={{state:state,update:update}}
        <NoteContext.Provider value={{notes,setNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;