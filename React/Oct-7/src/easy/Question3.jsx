import React, {useState} from 'react';

function Question3() {
    const [count, setCount] = useState(0)

    return (
        <div className={'p-3'}>
            <button className={"border bg-green-700 w-8 m-3 rounded-md"} onClick={()=> setCount(count+1)}>+</button>
            <span>{count}</span>
            <button className={"border bg-red-700 w-8 m-3 rounded-md"} onClick={()=> setCount(count-1)}>-</button>
        </div>
    );
}

export default Question3;