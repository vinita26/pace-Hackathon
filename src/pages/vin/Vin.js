import React, { useState } from 'react';
import { createPropsSelector } from 'reselect-immutable-helpers';
import * as loginSelector from '../login/selectors';
import { connect } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'


const Vin = (props) => {

    const [assetId, setAssetId] = useState('');
    const [locationName, setLocationName] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [validationMessage,setValidationMessage] = useState('');
    const [historyElements, setHistoryElements] = useState([])
    const [historyLabel, setHistoryLabel] = useState('')
    const [confidentialityFactor, setConfidentialityFactor] = useState('')

    const validateAssetHandler = () => {
        document.getElementById('validateButton').style.visibility = 'hidden';
        validateAsset(assetId)
    }

    const validateAsset = async () => {
        console.log("validateAsset")

        let assetType = assetId.startsWith("BRK") ? "brakePad" : "wheel";
        console.log("assetType", assetType)
        let value={};
        const value1 = {
            "wheel" : assetId
        }
        const value2 = {
            "brakePad" : assetId
        }
        
        let trackingAPIEndpoint;
        if(assetType=="brakePad") {
            trackingAPIEndpoint= "traceBrakePadTransactions"
            value=value2;
        }else {
            trackingAPIEndpoint= "traceWheelTransactions"
            value=value1;
        } 
        console.log("trackingAPIEndpoint: ",trackingAPIEndpoint);
        

        const res = await fetch(`http://ec2-34-229-55-132.compute-1.amazonaws.com:3000/api/${trackingAPIEndpoint}?${assetType}=${assetId}`, {
        //const res = await fetch(`http://localhost:5000/traceWheelTransactions?wheel=${assetId}` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)

        });
        const data = await res.json();
        console.log('vin data:', data)
       
        const validationMessage = (data.length > 0) ?  <div><h6 className="white-text" style={{backgroundColor: "green"}}> Product exists in Blockchain Network, it's a Authentic Asset</h6><form className="col s12">
        <div className="row" style={{marginBottom: "0px"}}>
            <span> <strong>Are you going to use this asset?</strong></span>
            <p>
                <label>
                    <input name="group1" type="radio" defaultChecked/>
                    <span className="white-text">Yes</span>
                </label>
                </p>
            <p>
                <label>
                    <input name="group1" type="radio"/>
                    <span  className="white-text">No</span>
                </label>
            </p>
            <div className="card-action" style={{padding: "10px 24px"}}>
            <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                // style={{display: "inline-block"}}
                onClick={() => M.toast({ html: "Updated in Blockchain Network" })}
            >Submit
            <i className="material-icons right">send</i>
            </button>
            </div>
        </div>
    </form>
    
    </div> : <div><h6 className="white-text" style={{backgroundColor: "red"}} > Product doesn't exists in Blockchain Network</h6> <label className="white-text" >Fake Wheels Can Be be a tempting option but Potentially Dangerous</label><img src='https://images.cdn.circlesix.co/image/1/1366/0/uploads/posts/2016/12/d7ee529c2c0e5a4fc1c91a97fe0a02b7.jpg' style={{width: "490px",height: "150px"}}></img></div>
        //'Product exists in Blockchain Network' : 'Product doesn\'t exists in Blockchain Network';
        setValidationMessage(validationMessage);

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
            
            return !isVin ? <li key={value}>{part}  </li> : <li>{`${parseValue.vin.substring(parseValue.vin.lastIndexOf('.') + 1)}`}</li>

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
        
        const historyLabel = () => {
            return (<label className="white-text" > <strong>Part History:</strong></label>)
        }
       
        const confidentialityFactor = () => {
            return (<h6 className="black-text" > <strong>Confidence Metric: 100%</strong></h6>)
        }

        if (data.length > 0) {
            setHistoryLabel(historyLabel)
            setHistoryElements(historyElements)
            setConfidentialityFactor(confidentialityFactor)
        }
      
        // props.history.push(`/vin/finalPage`);
    }


    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
                    <div className="card blue darken-1" >
                        <div className="card-content white-text" >

                            <span className="card-title" >Validate Asset:</span>
                            <div className="row" style={{marginBottom: "5px"}}>
                                <form className="col s12">
                                    <span> <strong>Asset ID:</strong></span>
                                    <input placeholder="Enter Asset Id" id="asset-id" type="text" className="validate" onChange={e => setAssetId(e.target.value)} value={assetId} />
                                </form>
                            </div>

                            <div className="row" style={{marginBottom: "5px"}}>
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

                            <div className="row" style={{marginBottom: "5px"}}>
                                <form className="col s12">
                                        <span> <strong>Seller Code:</strong></span>
                                        <input placeholder="Value" id="seller_code" type="text" className="validate white-text" onChange={e => setSellerId(e.target.value)} value={sellerId}/>
                                        
                                </form>
                            </div>
                            {validationMessage}
                            {historyLabel}
                            {historyElements}
                            {confidentialityFactor}
                            


                        </div>
                        <div className="card-action">
                            <button
                                className="btn waves-effect waves-light"
                                id="validateButton"
                                type="submit"
                                name="action"
                                onClick={() => validateAssetHandler(assetId)}
                                // document.getElementById('validateButton').style.visibility = 'hidden'}
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
