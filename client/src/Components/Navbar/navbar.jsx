import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { textDecoration } from '@chakra-ui/react';

const Navbar=()=>{
    return (
        <nav className="header">
            <div className='nav-logo'>
                <Link to="/"><h2 style={{color:"white", textDecoration:"none"}}>Gymify</h2></Link>
            </div>
            <ul className='nav-menu'>
                <li>Home</li>
                <li>About Us</li>
                <li>Features</li>
                <li>Contact Us</li>
            </ul>
            <div className='nav-buttons'>
               <Link to="/signin">
                   <button className='login'>Login</button>
                </Link>

                <Link to="/signup">
                <button className='register'>Signup</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar