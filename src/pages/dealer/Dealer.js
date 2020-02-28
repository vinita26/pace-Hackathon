import React, { useState } from 'react';

const Dealer = () => {

    const [productName, setProductName] = useState('');
    const [productDetails, setProductDetails] = useState([]);

    const getProductDetails = async (productName) => {
        console.log('productName: ', productName);

        const res = await fetch(`http://localhost:5000/${productName}`);
        const data = await res.json();
        console.log('Product detail: ', data);
        setProductDetails(data);
    }

    return (
        <div className="row align-center" >
            <div className="col s12 m6">
                <div className="card blue darken-1" >
                    <div className="card-content white-text" >
                        <span className="card-title" >Show Products Stock:</span>

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
                            <option value="" disabled >Choose Product</option>
                            <option value="PartManufacturer">Wheel</option>
                            <option value="CarManufacturer">Steering Wheel</option>
                        </select>

                        <ul className="collection">
                            {productDetails !== null && productDetails.map(
                                product => (<li className="collection-item">{product} {product.assetID}</li>))}
                            {/* <li className="collection-item">Alvin</li>
                            <li className="collection-item">Alvin</li>
                            <li className="collection-item">Alvin</li>
                            <li className="collection-item">Alvin</li> */}
                        </ul>

                    </div>
                    <div className="card-action">
                        <button
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={getProductDetails("Wheel")}
                        >Get Stock Details
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Dealer;
