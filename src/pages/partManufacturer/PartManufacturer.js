import React, { useState } from 'react';
import { createPropsSelector } from 'reselect-immutable-helpers';
import * as loginSelector from '../login/selectors';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'


const PartManufacturer = (props) => {

    const [productName, setProductName] = useState('');
    const [existingProductsData, setExistingProductsData] = useState([]);

    const getAllProducts = async () => {

        getAllWheels();
        //getAllSteeringwheels();
    }

    const getAllWheels = async () => {
        console.log("getAllWheels")
        //const currentParticipant = "resource:org.nissan.dlf.PartManufacturer#" + props.participantID
        const currentParticipant = "resource:org.nissan.dlf.AutoParticipant#" + props.participantID
        console.log("currentParticipant", currentParticipant)
        let res = await fetch(`http://ec2-34-229-55-132.compute-1.amazonaws.com:3000/api/queries/selectAllWheelsByCurrentParticipant?currentParticipant=${encodeURIComponent(currentParticipant)}`)
        //const res = await fetch(`http://localhost/5000/Wheel?currentParticipant=${encodeURIComponent(currentParticipant)}`)

        const data = await res.json();
        console.log("wheels data:", data)
        setExistingProductsData(data);
    }

    const getAllSteeringwheels = async () => {
        console.log("getAllWheels")
        //const currentParticipant = "resource:org.nissan.dlf.PartManufacturer#" + props.participantID
        const currentParticipant = "resource:org.nissan.dlf.AutoParticipant#" + props.participantID
        console.log("currentParticipant", currentParticipant)
        let res = await fetch(`http://ec2-34-229-55-132.compute-1.amazonaws.com:3000/api/queries/selectAvailableSteeringWheelsByCurrentParticipant?currentParticipant=${encodeURIComponent(currentParticipant)}`)
        //const res = await fetch(`http://localhost/5000/Wheel?currentParticipant=${encodeURIComponent(currentParticipant)}`)

        const data = await res.json();
        console.log("steering wheels data:", data)
        setExistingProductsData(data);
    }

    const addProduct = async (productName) => {
        let newProduct = {}
        console.log('productName: ', productName)
        if (productName === "Wheel") {
            newProduct = {
                "$class": "org.nissan.dlf." + productName,
                "diameter": "16inch",
                "width": "195mm",
                "speedRating": "75mbps",
                "assetId": "WHBAP024",
                "manufacturerId": props.participantID,
                "currentParticipant": props.participantID
            }
        }
        else if (productName === "SteeringWheel") {
            newProduct = {
                "$class": "org.nissan.dlf." + productName,
                "spocs": "R&P",
                "size": "14.5inch",
                "width": "7inch",
                "dish": "10mm",
                "assetId": "SWHBAP024",
                "manufacturerId": props.participantID,
                "currentParticipant": props.participantID
            }
        }
        else if (productName === "BrakePad") {
            newProduct = {
                "$class": "org.nissan.dlf." + productName,
                "damping": "SIMS damping",
                "frictionMaterial": "Ceramic",
                "assetId": "BRK004",
                "manufacturerId": props.participantID,
                "currentParticipant": props.participantID
              }
        }

        console.log('product', newProduct);
        const res = await fetch(`http://ec2-34-229-55-132.compute-1.amazonaws.com:3000/api/${productName}`, {
            //const res = await fetch(`http://localhost:5000/${productName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)

        });
        const data = await res.json();
        M.toast({ html: "New Product added" });
        console.log('newproduct', data);
    }

    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
                    <div className="card blue darken-1" >
                        <div className="card-content white-text" >

                            <span className="card-title" >Current Stock:</span>
                            <button className="waves-effect waves-light btn" onClick={getAllProducts}>Get</button>
                            <ul className="collection">
                                {existingProductsData && (existingProductsData.map(product => (
                                    // <li key={product.assetId} value={product.assetId}>
                                    //     {product.assetId}
                                    // </li>
                                    <li key={product.assetId}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Id:
                                                </td>
                                                    <td value={product.assetId}>
                                                        {product.assetId}
                                                    </td>
                                                </tr>

                                            </tbody>

                                        </table>

                                    </li>
                                )))}
                            </ul>


                            <span className="card-title" >Add New Product:</span>
                            <label className="white-text">Select Product:</label>
                            <select
                                name="productName"
                                className="browser-default"
                                value={productName}
                                onChange={e => {
                                    setProductName(e.target.value);
                                }
                                }
                            >
                                <option value="" disabled >Select</option>
                                <option>Wheel</option>
                                <option>SteeringWheel</option>
                                <option>BrakePad</option>
                            </select>



                        </div>
                        <div className="card-action">
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={() => addProduct(productName)}
                            >Add Product
                            <i className="material-icons right">add</i>
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
    mapStateToProps)(PartManufacturer)
