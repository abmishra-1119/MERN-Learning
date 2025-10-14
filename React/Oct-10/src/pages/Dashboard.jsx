import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router';
import { authContext } from '../context/authContext';

const Dashboard = () => {

    const { user } = useContext(authContext)

    return (
        <div className='dashboard'>
            <div className='sidebar'>
                <div>
                    <Link to={'/'}>Dahboard</Link>
                </div>
                <div><Link to={''}>Add Product</Link></div>
            </div>
            <div className='content'>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
