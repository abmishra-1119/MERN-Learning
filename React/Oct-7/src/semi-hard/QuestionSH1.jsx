import React, { useEffect, useState, useRef } from 'react';

function QuestionSh1() {
    const [timer, setTimer] = useState(0)
    const [active, setActive] = useState(true);

    let id = useRef(null)



    // useEffect(() => {
    //     // Mount phase
    //     // timer start logic
    //     // if()
    //     // id.current = setInterval(callback, delay)
    //     console.log('mount')

    //     return () => {
    //         // Un-mount phase
    //         // clear timer
    //         // clearInterval(id.current)
    //         console.log('unmount')
    //     }

    // }, []); // dep array -> didUpdate phase

    // useEffect(() => {
    //     let intervalId
    //     if (active) {
    //         intervalId = setInterval(() => {
    //             setTimer(prev => prev + 1)
    //         }, 1000)
    //     }
    //     return () => {
    //         console.log('here')
    //         clearInterval(intervalId)
    //     }
    // }, [active]);

    useEffect(() => {
        if (active) {
            id.current = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }

        return () => {
            clearInterval(id.current)
        }
    }, []);

    const startInterval = () => {
        id.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
        setActive(true)
    }

    const stopTimer = () => {
        clearInterval(id.current)
        setActive(false);
    }
    const setReset = () => {
        setActive(false);
        setTimer(0);
    }

    return (
        <div className={'p-3'}>
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