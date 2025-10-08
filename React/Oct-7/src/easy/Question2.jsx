import React from 'react';

function Welcome({name}){
    return (
        <div className={'p-3'}>
            Hello, {name}
        </div>
    )
}



function Question2() {
    return (
        <div>
            <Welcome name ='Jayraj' />
            <Welcome name ='Gautam' />
            <Welcome name ='Piyush' />
        </div>
    );
}

export default Question2;