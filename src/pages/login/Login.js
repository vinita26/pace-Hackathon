import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as actions from './actions'

const Login = (props) => {

    const [stakeHolderType, setStakeHolderType] = useState('');
    const [stakeHolderData, setStakeHolderData] = useState([]);
    const [selectedStakeHolderData, setSelectedStakeHolderData] = useState('');


    const getStakeHolderData = async (stakeHolderType) => {
        // console.log('stakeHolderType value: ', stakeholderType)
        const res = await fetch(`http://ec2-54-211-125-42.compute-1.amazonaws.com:8080/api/${stakeHolderType}`);
        //const res = await fetch(`http://localhost:5000/${stakeHolderType}`);
        const data = await res.json();
        // console.log('names', data)
        setStakeHolderData(data);
        setStakeHolderType(stakeHolderType);
        // console.log("stakeholderData:", stakeholderData)
    }

    const updateSelectedStakeHolderDataInternal = (e) => {
        props.updateSelectedStakeHolderData(stakeHolderData.filter((stakeHolder) => {
            return stakeHolder.name === e.target.value
        })[0])
        setSelectedStakeHolderData(e.target.value)
    }

    const login = () => {
        const stakeHolderDetails = { stakeHolderType, selectedStakeHolderData }
        //console.log('stakeHolderDetails', stakeHolderDetails)

        const selectedSHData = stakeHolderData.filter((stakeHolder) => {
            if (Object.keys(stakeHolder).includes("vinID")) {
                return stakeHolder.model + '/' + stakeHolder.vinID === selectedStakeHolderData
            }
            else {
                return stakeHolder.name === selectedStakeHolderData
            }

        })[0]

        console.log('selectedSHData', selectedSHData)
        props.updateStakeHolderDetails(stakeHolderDetails)
        props.history.push(`/${stakeHolderType.charAt(0).toLowerCase() + stakeHolderType.slice(1) + '/' + (selectedSHData.participantID || selectedSHData.vinID)}`)
        console.log('Login function', stakeHolderType, selectedStakeHolderData);
    }

    const stakeHolderOptions = stakeHolderData.map(stakeholder => {
        const shaLength = stakeholder.$class.split('.').length
        const stakeHolderName = stakeholder.$class.split('.')[shaLength - 1]
        if (stakeHolderName === "Vin") {
            return (<option key={stakeholder.vinID} value={`${stakeholder.model}/${stakeholder.vinID}`}>{`${stakeholder.model}/${stakeholder.vinID}`}</option>)
        } else {
            return (<option key={stakeholder.participantID} value={stakeholder.name}>{stakeholder.name}</option>)
        }
    })

    //console.log("stakeHolderOptions", stakeHolderOptions)

    //console.log("stakeholderData:", stakeHolderData)

    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
                    <div className="card blue darken-1" >
                        <div className="card-content white-text" >
                            <span className="card-title" >Login As:</span>

                            <label className="white-text">Select stakeHolder Type</label>
                            <select
                                name="stakeholderType"
                                className="browser-default"
                                value={stakeHolderType}
                                onChange={e => getStakeHolderData(e.target.value)}
                            >
                                <option value="" disabled >Choose your option</option>
                                <option value="PartManufacturer">PartManufacturer</option>
                                <option value="CarManufacturer">CarManufacturer</option>
                                <option value="Dealer">Dealer</option>
                                <option value="Vin">Vin</option>
                            </select>

                            <label className="white-text">Select stakeHolder Name</label>
                            <select
                                name="stakeHolderNames"
                                className="browser-default"
                                value={selectedStakeHolderData}
                                onChange={e => {
                                    updateSelectedStakeHolderDataInternal(e)
                                }}
                            >

                                <option value="" disabled >Choose your option</option>
                                {stakeHolderData && stakeHolderOptions}
                            </select>

                        </div>
                        <div className="card-action">
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={login}
                            >Login
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

// const mapStateToProps = {
//     selectedStakeHolderFromStore: selectors.getSelectedStakeHolderFromStore
// }

const mapDispatchToProps = {
    updateSelectedStakeHolderData: actions.updateSelectedStakeHolderData,
    updateStakeHolderDetails: actions.updateStakeHolderDetails
}

export default connect(
    null,
    mapDispatchToProps)
    (Login);
