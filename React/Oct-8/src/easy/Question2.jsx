import React from 'react';
import { useState } from 'react';

const Fruits = ['Apple', 'Banana', 'Orange', 'Watermelon']

const Show = Fruits.map((fruit, id) => <div key={`${id}-${fruit}`}>{fruit}</div>)

const Question2 = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>

            {
                toggle ? Show : ""
            }


        </div>
    );
}

export default Question2;
