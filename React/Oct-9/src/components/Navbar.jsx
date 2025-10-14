import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div>
            <nav className='navbar'>
                <div>
                    <h2>Abhishek Mishra</h2>
                </div>
                <div className='link'>
                    <NavLink className={(({ isActive }) => isActive ? "active" : 'my-nav-link')} to={'/'}>Form 1</NavLink>
                    <NavLink className={'my-nav-link'} to={'/q2'}>Form 2</NavLink>
                    <NavLink className={'my-nav-link'} to={'/q3'}>Todo</NavLink>
                </div>
            </nav >
        </div >
    );
}

export default Navbar;
