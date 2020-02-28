import { combineReducers } from 'redux'

import loginReducer from './pages/login/reducer'
import homeReducer from './pages/home/reducer'

export default combineReducers({
    data: combineReducers({
        pages: combineReducers({
            home: homeReducer,
            login: loginReducer
        })
    })
})
