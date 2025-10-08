import React from 'react';
import { useEffect } from 'react';

const QuestionMd3 = () => {
    useEffect(() => {
        console.log('Component mounted')

        return () => {

            console.log('Component unmounted')
        }
    })

    return (
        <div>
            This is Component
        </div>
    );
}

export default QuestionMd3;
