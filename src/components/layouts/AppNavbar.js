import React from 'react';

const AppNavbar = () => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="blue">
                    <div className="nav-wrapper">
                        <div className="container" style={{ fontSize:"20px",textAlign:"center" }}>Supply Chain Ledger using BlockChain</div>
                        {/* <ul className="right hide-on-med-and-down">
                            <li><a href="sass.html">Home</a></li>
                            <li><a href="badges.html">About</a></li>
                        </ul> */}
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default AppNavbar;
