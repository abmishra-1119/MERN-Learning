import React, {useEffect, useState} from 'react';

function QuestionM4() {
    const [num, setNum] = useState(0)

    useEffect(() => {
        console.log("Number is Changed",num)
    }, [num]);
    return (
        <div>
            <button className={'border p-0.5'} onClick={()=> setNum(num+1)} >Click To log the number</button>
            <p>This is num: {num}</p>

        </div>
    );
}

export default QuestionM4;