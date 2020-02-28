import React, { useState } from 'react';
import { createPropsSelector } from 'reselect-immutable-helpers';
import * as loginSelector from '../login/selectors';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'


const Vin = (props) => {

    const [assetId, setAssetId] = useState('')
    const [historyElements, setHistoryElements] = useState([])

    const validateAsset = async () => {
        console.log("validateAsset")
        const value = {
            "wheel": assetId
        }
        const res = await fetch(`http://ec2-54-89-17-196.compute-1.amazonaws.com:8080/api/traceWheelTransactions?wheel=${assetId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)

        });
        const data = await res.json();
        console.log(data)
        if (data.length > 0) {
            M.toast({ html: "Product exists in Blockchain Network" })
        }
        else {
            M.toast({ html: "Product doesn't exists in Blockchain Network" })
        }
        const historyElements = data.map(value => {
            const parseValue = JSON.parse(value)
            const isVin = Object.keys(parseValue).includes("vin")
            const part = parseValue.currentParticipant
            return !isVin ? <span>{`${part.substring(part.lastIndexOf('.') + 1)}`} -> </span> : <span>{`${parseValue.vin.substring(parseValue.vin.lastIndexOf('.') + 1)}`}</span>
            // console.log(JSON.parse(value))
        }
        )
        setHistoryElements(historyElements)
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
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input placeholder="Enter Asset Id" id="asset-id" type="text" className="validate" onChange={e => setAssetId(e.target.value)} value={assetId} />
                                        </div>
                                    </div>
                                </form>
                            </div>

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
