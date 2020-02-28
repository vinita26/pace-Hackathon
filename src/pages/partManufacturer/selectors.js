import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

const getData = ({ data }) => data

export const getLogin = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.login
    }
)

export const getStakeHolderType = createGetSelector(getLogin, 'stakeHolderType')
export const getSelectedStakeHolderData = createGetSelector(getLogin, 'selectedStakeHolderData')
export const getSelectedStakeHolderFromStore = createGetSelector(getLogin, 'selectedStakeHolderFromStore')
export const getSelectedParticipantID = createGetSelector(getLogin, 'participantID')
