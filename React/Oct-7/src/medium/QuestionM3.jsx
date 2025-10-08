import React, {useState} from 'react';

const Child = ({NumFun})=>{
    return (
        <>
            <button className={'border p-0.5 mx-3'} onClick={()=> NumFun()} >Click to update in Parent</button>
        </>
    )
}

function QuestionM3() {
    const [num, setNum] = useState(0)

    const Func = () =>{
        setNum(prev => prev+1)
    }

    return (
        <div className={'p-1'}>
            This is num : {num}
            <Child NumFun = {Func} />

        </div>
    );
}

export default QuestionM3;