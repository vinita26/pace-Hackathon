import React from 'react'

const AppNavbar = () => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="blue">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo" style={{ marginLeft: "15px" }}>BlockChain</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="sass.html">Home</a></li>
                            <li><a href="badges.html">About</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default AppNavbar;
