import React, {useState} from 'react';

function QuestionM5() {
    const [visible, setVisible] = useState(true)


    return (
        <div>
            <button className={'border p-0.5'} onClick={()=> setVisible(!visible)}>Toggle</button>
            {visible?(
                <p>Hello react</p>
            ):(
                ""
            )}
        </div>
    );
}

export default QuestionM5;