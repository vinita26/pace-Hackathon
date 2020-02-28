import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login'
import PartManufacturer from './pages/partManufacturer/PartManufacturer';
import CarManufacturer from './pages/carManufacturer/CarManufacturer';
import Dealer from './pages/dealer/Dealer';
import Vin from './pages/vin/Vin';
import AppNavbar from './components/layouts/AppNavbar';
import Footer from './components/layouts/Footer'


class Router extends React.Component {

    render() {
        const { store } = this.props
        return (
            <React.Fragment>
                <AppNavbar />
                <Provider store={store}>
                    <BrowserRouter>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/partManufacturer/:participantId" component={PartManufacturer} />
                        <Route exact path="/carManufacturer/:participantId" component={CarManufacturer} />
                        <Route exact path="/dealer/:participantId" component={Dealer} />
                        <Route exact path="/vin/:participantId" component={Vin} />
                    </BrowserRouter>
                </Provider>
                <Footer />
            </React.Fragment>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router
