import React, {useState} from 'react';

function QuestionM5() {
    const [visible, setVisible] = useState(true)


    return (
        <div className={'p-3'}>
            <button className={'border p-0.5 my-1'} onClick={()=> setVisible(!visible)}>Toggle</button>
            {visible?(
                <p>Hello react</p>
            ):(
                <p></p>
            )}
        </div>
    );
}

export default QuestionM5;