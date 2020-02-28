// export const UPDATE_STACK_HOLDER_NAMES = 'UPDATE_STACK_HOLDER_NAMES'
// export const UPDATE_STACK_HOLDER_TYPE = 'UPDATE_STACK_HOLDER_TYPE'
export const UPDATE_STAKE_HOLDER_DETAILS = 'UPDATE_STAKE_HOLDER_DETAILS'
export const UPDATE_SELECTED_STAKE_HOLDER_DATA = 'UPDATE_SELECTED_STAKE_HOLDER_DATA'
// export const updateHomeDataState = (payload) => ({ type: HOME_DATA_STATE_RECEIVED, payload })
// const ds = new DataService()
// export const initializeHome = () => (dispatch) => {
//     // return Promise.all([
//     //     dispatch(initializeApp())
//     // ])
//     // .then(() => ({statusCode: 200}))
//     // .catch((err) => ({statusCode: err.statusCode || 500}))
//     ds.getFeaturedImages().then(res => {
//         // console.log(res)
//         dispatch(saveRetrievedImages(res))
//     }).catch(err => console.log(err))
// }

export const updateStakeHolderDetails = (stakeHolderDetails) => {
    return {
        type: UPDATE_STAKE_HOLDER_DETAILS,
        payload: stakeHolderDetails
    }
}


export const updateSelectedStakeHolderData = (selectedStakeHolderData) => {
    return {
        type: UPDATE_SELECTED_STAKE_HOLDER_DATA,
        payload: selectedStakeHolderData
    }
}