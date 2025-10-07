import React, {useEffect, useState} from 'react';

function QuestionSh1() {
    const [timer, setTimer] = useState(0)
    const [active, setActive] = useState(true);


    const startInterval = () => {
        setActive(true)
    }

    useEffect(() => {
        let intervalId
        if (active) {
            intervalId = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(intervalId)
    }, [active]);

    // useEffect(() => {
    //     clearInterval(intervalId)
    //     setStop(false)
    //     setActive(false)
    // }, [stop]);

    const stopTimer = () => {
        // clearInterval(intervalId)
        setActive(false);
    }
    const setReset = () => {
        setActive(false);
        setTimer(0);
    }

    // useEffect(() => {
    //     clearInterval(intervalId)
    //     setTimer(0)
    //     setActive(false)
    // }, [reset]);
    return (
        <div>
            <p>Timer: {timer}</p>
            <button className={'border p-0.5 disabled:opacity-50 disabled:cursor-not-allowed m'}
                    onClick={() => startInterval()} disabled={active}>Start
            </button>
            <button className={'border p-0.5 mx-3'} onClick={stopTimer}>Stop</button>
            <button className={'border p-0.5'} onClick={() => setReset()}>Reset</button>
        </div>
    );
}

export default QuestionSh1;