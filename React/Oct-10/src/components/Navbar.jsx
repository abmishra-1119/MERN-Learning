import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const userData = localStorage.getItem("user")
    return (
        <div>
            <nav className='navbar'>
                <div>
                    <h2>Logo</h2>
                </div>
                <div className='link'>
                    <NavLink className={(({ isActive }) => isActive ? "active" : 'my-nav-link')} to={'/'}>Home</NavLink>
                    <NavLink className={'my-nav-link'} to={'/about'}>About</NavLink>
                    {
                        userData ?
                            <NavLink className={'my-nav-link'} to={'/dashboard'}>Dashboard</NavLink>
                            :
                            <>
                                <NavLink className={'my-nav-link'} to={'/login'}>Login</NavLink>
                                <NavLink className={'my-nav-link'} to={'/register'}>Register</NavLink>
                            </>

                    }
                </div>
            </nav >
        </div >
    );
}

export default Navbar;
