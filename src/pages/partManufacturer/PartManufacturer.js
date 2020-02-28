import React, { useState } from 'react';
import { createPropsSelector } from 'reselect-immutable-helpers';
import * as loginSelector from '../login/selectors';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'


const PartManufacturer = (props) => {

    const [productName, setProductName] = useState('');
    const [existingProductsData, setExistingProductsData] = useState([]);

    const getAllProducts = async () => {

        console.log("getAllProducts")
        const currentParticipant = "resource:org.nissan.dlf.PartManufacturers#" + props.participantID
        console.log("currentParticipant", currentParticipant)
        // const res = await fetch(`http://ec2-34-201-220-116.compute-1.amazonaws.com:8080/api/Wheel?currentParticipant=${encodeURIComponent(currentParticipant)}`)
        const res = await fetch(`http://localhost/5000/Wheel?currentParticipant=${encodeURIComponent(currentParticipant)}`)

        const data = await res.json();
        console.log(data)
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
                "assetId": "5",
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
                "assetId": "4",
                "manufacturerId": props.participantID,
                "currentParticipant": props.participantID
            }
        }

        // const res = await fetch(`http://ec2-34-201-220-116.compute-1.amazonaws.com:8080/api/${productName}`, {
        const res = await fetch(`http://localhost:5000/${productName}`, {
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

                            <span className="card-title" >Current Product Stock:</span>
                            <button className="waves-effect waves-light btn" onClick={getAllProducts}>Get</button>
                            <ul className="collection">
                                {existingProductsData && (existingProductsData.map(product => (
                                    <li className="collection-item" key={product.assetId}>{product.$class}
                                        <a className="waves-effect waves-light btn" >Assign</a>
                                    </li>
                                )))}
                            </ul>


                            <span className="card-title" >Add New Product:</span>
                            <label className="white-text">Select Product Type:</label>
                            <select
                                name="productName"
                                className="browser-default"
                                value={productName}
                                onChange={e => {
                                    setProductName(e.target.value);
                                }
                                }
                            >
                                <option value="" disabled >Choose your option</option>
                                <option>Wheel</option>
                                <option>SteeringWheel</option>
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
