import { NavLink, Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/users/userSlice';

const Layout = () => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.users)
    const dispatch = useDispatch()


    const Logout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <div>
                <nav className='navbar'>
                    <div>
                        <h2>{user?.username || "Guest"}</h2>
                    </div>
                    <div className='link'>
                        <NavLink className={(({ isActive }) => isActive ? "active" : 'my-nav-link')} to={'/'}>Home</NavLink>
                        <NavLink className={'my-nav-link'} to={'/about'}>About</NavLink>
                        {
                            user ?
                                <>
                                    <NavLink className={'my-nav-link'} to={'/dashboard'}>Dashboard</NavLink>
                                    <button className='logout' onClick={Logout}>Logout</button>
                                </>
                                :
                                <>
                                    <NavLink className={'my-nav-link'} to={'/login'}>Login</NavLink>
                                    <NavLink className={'my-nav-link'} to={'/register'}>Register</NavLink>
                                </>

                        }
                    </div>
                </nav >
            </div >
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
