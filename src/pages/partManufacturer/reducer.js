import Immutable from 'immutable'

import {

} from './actions'

const initialState = Immutable.Map({
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STAKE_HOLDER_DETAILS:
        case UPDATE_SELECTED_STAKE_HOLDER_DATA:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer
