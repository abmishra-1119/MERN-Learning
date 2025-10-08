import React from 'react';


const OnePiece = ['Ace', 'Brook', 'Chooper', 'Dragon', 'Eneru', 'Frank', 'Garp', 'Hancock', 'Imu', 'Jinbei', 'Kaido', 'Luffy', 'Mihawk', 'Nami', 'Oden', 'puddin', 'Queen', 'Robin', 'Sanji', 'Teach', 'Usoop', 'Vinsmoke', 'Whitbeard', 'x-Drake', 'Yamato', 'Zoro']

const Question1 = () => {
    return (
        <div>
            <h4>OnePiece Characters:</h4>
            {
                OnePiece.map((character, id) => <div key={`${id}-${character}`}>{character}</div>)
            }
        </div>
    );
}

export default Question1;
