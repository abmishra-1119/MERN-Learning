import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {

    const { state } = useAppContext()

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
