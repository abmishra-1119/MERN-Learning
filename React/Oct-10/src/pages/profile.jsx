import React, { useContext } from 'react';
import { authContext } from '../context/authContext';

const Profile = () => {
    const { user } = useContext(authContext)
    return (
        <div className='profile-page' >
            <div className='profile'>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
            </div>
        </div>
    );
}

export default Profile;
