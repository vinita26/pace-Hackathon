import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../layouts/Login';
import AppNavbar from '../layouts/AppNavbar';

import PartManufacturer from './PartManufacturer';
import CarManufacturer from './CarManufacturer';
import Dealer from './Dealer';
import CarUser from './CarUser';
import NotFound from './NotFound';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'

const Home = () => {
    useEffect(() => {
        //Init Materialize JS
        M.AutoInit();
    })

    const checkLogin = (isLoggedIn) => {
        console.log("isLoggedIn: ", isLoggedIn)
    }
    return (
        <div className="Home">
            <AppNavbar />
            <Login />
            {/* <PartManufacturer /> */}
        </div>
        // <Router>
        //     <div className="Home">
        //         <AppNavbar />
        //         <Switch>
        //             {/* <Link to="/" >
        //                 <Login />
        //             </Link>
        //             <Link to="/partManufacturer">
        //                 <PartManufacturer />
        //             </Link> */}
        //             <Route exact path='/' component={Login} />
        //             {/*<Route exact path="/partManufacturer /:participantId" component={PartManufacturer} />
        //             <Route exact path="/carManufacturer/:participantId" component={CarManufacturer} />
        //             <Route exact path="/dealer/:participantId" component={Dealer} />
        //             <Route exact path="/user/:participantId" component={CarUser} /> */}

        //             <Route component={NotFound} />

        //         </Switch>
        //     </div>
        // </Router>

    );
}

export default Home;