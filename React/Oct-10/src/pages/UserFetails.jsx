import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UserFetails = () => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                setLoading(false)
            })
    }, []);



    return (
        <div className='user'>
            {
                loading ?
                    <div>Loading...</div>
                    :
                    <div className='prodcutDetail' >
                        {user.name}
                    </div>
            }
        </div>
    );
}

export default UserFetails;
