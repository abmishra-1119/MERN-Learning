import React, {useState} from 'react';

const Child = ({func, childUpdate}) => {
    return (
        <>
            <p>Child Count: {childUpdate}</p>
            <button className={'border p-0.5'} onClick={() => func()}>Update from child</button>

        </>
    )
}

function QuestionSh2() {

    const [count, setCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    const func = () => {
        setCount(prev => prev + 1)
    }

    const childUpdate = () => {
        setChildCount(prev => prev + 1)
    }
    return (
        <div>
            <p>This is Count: {count}</p>
            <button className={'border p-0.5 mx-1'} onClick={() => childUpdate()}>Update from parent</button>
            <Child func={func} childUpdate={childCount}/>
        </div>
    );
}

export default QuestionSh2;