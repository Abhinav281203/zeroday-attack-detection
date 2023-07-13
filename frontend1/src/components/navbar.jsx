import React from 'react';
import './navbar.css';

function Navbar({ user, logout }) {
    if (user)
        console.log(user.username);
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" >
                    <span className="white-text">DZD</span>
                </a>
            </div>
            <div className="navbar-right">
                <a href="/about" className="about">
                    <span className="white-text">About</span>
                </a>
                {user ? (
                    <a href="/signup">
                        <button className="button" onClick={logout}>{user.username}</button>
                    </a>
                ) : (
                    <a href="/signup">
                        <button className="button">Sign Up</button>
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;