import React, {useState} from 'react';

function Question4() {
    const [input, setInput] = useState("")
    return (
        <div className={'p-3'}>
            <input type={'text'} placeholder={"Type here"} className={"border p-0.5 rounded-md"} onChange={(e)=> setInput(e.target.value)} />
            <button className={"border mx-3 p-0.5 rounded"} onClick={()=> console.log(input)} >Click to Log</button>
        </div>
    );
}

export default Question4;