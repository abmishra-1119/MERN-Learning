import React, { useRef } from 'react';

const QuestionMd2 = () => {

    const id = useRef(null)


    return (
        <div>
            <input type="text" ref={id} />
            <button onClick={() => id.current.focus()} >click</button>
        </div>
    );
}

export default QuestionMd2;
