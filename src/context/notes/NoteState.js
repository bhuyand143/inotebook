import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=>{
    const s1={
        "name":"Bhuyan",
        "class":"10th"
    }
    const [state, setState] = useState(s1);
    const update=()=>{
        setTimeout(() => {
           setState({
            "name":"Dibyajyoti",
            "class":"12th"
           })
        },1000);
    }
    return (
        //value={{state,update}} is same as value={{state:state,update:update}}
        <NoteContext.Provider value={{state,update}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;