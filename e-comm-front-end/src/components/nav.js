import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = ()=>{
        const auth = localStorage.getItem('user');
        if(auth){
           localStorage.clear();
           console.warn("You've been logged out")
        }
    }

    return (
        <div>
            <img
                alt="logo"
                className="logo"
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-commerce-logo-design-template-5dcf2e4daab6379d4824c6dc04e26f17_screen.jpg?ts=1645336764"
            />
            {auth ?
                <ul className="nav-ul">
                    <li><Link to='/'>Products</Link></li>
                    <li><Link to='/update'>Update Product</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/logout' onClick={logout}>Logout({JSON.parse(auth).name})</Link></li>
                </ul> 
                :<ul className="nav-ul nav-right">
                    <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Navbar;