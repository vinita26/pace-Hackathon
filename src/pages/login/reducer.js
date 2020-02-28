import Immutable from 'immutable'

import {
    UPDATE_STAKE_HOLDER_DETAILS,
    UPDATE_SELECTED_STAKE_HOLDER_DATA
} from './actions'

const initialState = Immutable.Map({
    stackHolderType: ''
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
