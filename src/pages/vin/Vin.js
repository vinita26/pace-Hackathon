import React, { useState } from 'react';
import { createPropsSelector } from 'reselect-immutable-helpers';
import * as loginSelector from '../login/selectors';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'


const Vin = (props) => {

    const [assetId, setAssetId] = useState('')
    const [locationName, setLocationName] = useState('');
    const [historyElements, setHistoryElements] = useState([])
    const [historyLabel, setHistoryLabel] = useState('')

    const validateAsset = async () => {
        console.log("validateAsset")
        const value = {
            "wheel": assetId
        }
        const res = await fetch(`http://ec2-34-229-55-132.compute-1.amazonaws.com:3000/api/traceWheelTransactions?wheel=${assetId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)

        });
        const data = await res.json();
        console.log('vin data:', data)

        if (data.length > 0) {
            M.toast({ html: "Product exists in Blockchain Network" })
        }
        else {
            M.toast({ html: "Product doesn't exists in Blockchain Network" })
        }
        const historyElements = data.map(value => {
            const parseValue = JSON.parse(value)
            let part=""
            console.log("parsevalue",  parseValue);
            
            const isVin = Object.keys(parseValue).includes("vin")
            console.log("isVin", isVin);
            
            if(parseValue.currentParticipant) {
                part = parseValue.currentParticipant.substring(parseValue.currentParticipant.lastIndexOf('.') + 1);
            }
            else
                part = parseValue.manufacturerId.substring(parseValue.manufacturerId.lastIndexOf('.') + 1);
            
            console.log("part:",part);
            
            return !isVin ? <li key="">{part}  </li> : <li>{`${parseValue.vin.substring(parseValue.vin.lastIndexOf('.') + 1)}`}</li>

            //console.log("parseValue:", parseValue)
            // return (
            //     <div>
            //         <label className="white-text">Part History:</label>
            //         <nav>
            //             <div className="nav-wrapper green">
            //                 <div className="col s12">
            //                     !isVin ? <li>{`${part.substring(part.lastIndexOf('.') + 1)}`}</li> : <li>{`${parseValue.vin.substring(parseValue.vin.lastIndexOf('.') + 1)}`}</li>

            //                 </div>
            //             </div>
            //         </nav>
            //     </div>)
        }
        )
        setHistoryElements(historyElements)

        const historyLabel = () => {
            return (<label className="white-text" > <strong>Part History:</strong></label>)
        }
        setHistoryLabel(historyLabel)
    }


    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
                    <div className="card blue darken-1" >
                        <div className="card-content white-text" >

                            <span className="card-title" >Validate Asset:</span>
                            <div className="row">
                                <form className="col s12">
                                    <span> <strong>Asset ID:</strong></span>
                                    <input placeholder="Enter Asset Id" id="asset-id" type="text" className="validate" onChange={e => setAssetId(e.target.value)} value={assetId} />
                                </form>
                            </div>

                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <span> <strong>Purchase Location:</strong></span>
                                        <select
                                                name="locationName"
                                                className="browser-default"
                                                value={locationName}
                                                onChange={e => {
                                                    setLocationName(e.target.value);
                                                }
                                                }
                                            >
                                                <option value="" disabled >Select</option>
                                                <option>Bangalore</option>
                                                <option>Delhi</option>
                                                <option>Pune</option>
                                                <option>Kolkata</option>
                                                <option>Chennai</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div className="row">
                                <form className="col s12">
                                        <span> <strong>Seller Code:</strong></span>
                                        <input placeholder="Value" id="seller_code" type="text" className="validate white-text"/>
                                        
                                </form>
                            </div>

                            {historyLabel}
                            {historyElements}


                        </div>
                        <div className="card-action">
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={() => validateAsset(assetId)}
                            >Validate Product
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
const mapStateToProps = createPropsSelector({
    participantID: loginSelector.getSelectedParticipantID
})

export default connect(
    mapStateToProps)(Vin)
