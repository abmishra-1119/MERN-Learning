import React, {useState} from 'react';

function Question4() {
    const [input, setInput] = useState("")
    return (
        <div>
            <input type={'text'} placeholder={"Type here"} className={"border"} onChange={(e)=> setInput(e.target.value)} />
            <button className={"border mx-3"} onClick={()=> console.log(input)} >Click to Log</button>
        </div>
    );
}

export default Question4;