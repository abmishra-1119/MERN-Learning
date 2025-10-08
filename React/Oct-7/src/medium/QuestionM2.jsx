import React, {useState} from 'react';

const Child = ({num})=>{
    return (
        <>
            This is count: {num}
        </>
    )
}

function QuestionM2() {
    const [num, setNum] = useState(0);

    return (
        <div>
            <button className={"border p-0.5 mx-3"} onClick={()=> setNum(num+1)} >Click to update in child</button>
            <Child num = {num} />
        </div>
    );
}

export default QuestionM2;