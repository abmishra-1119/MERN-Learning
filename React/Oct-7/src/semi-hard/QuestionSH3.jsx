import React from 'react';

const Button = ({text, Click}) => {
    return (
        <button className={'border p-0.5'} onClick={() => Click()}>{text}</button>
    )
}

function QuestionSh3() {
    const Onclick = () => {
        console.log("Button Clicked")
    }
    return (
        <div>
            <Button text={"clickMe"} Click={Onclick}/>
        </div>
    );
}

export default QuestionSh3;