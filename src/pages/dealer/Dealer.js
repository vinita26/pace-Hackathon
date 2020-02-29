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

    const showProducts = productDetails.map(product => {
        console.log('array product', product[0])
        console.log("product", product)
        console.log("asset", product.assetId)
        return (
            <li key={product.assetId} value={product.assetId}>{product.assetId}</li>)
    })


    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
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
                                <option value="Wheel">Wheel</option>
                                <option value="SteeringWheel">SteeringWheel</option>
                            </select>

                            {productName && <span className="card-title" >Products in Stock:</span>}
                            <ul className="collection">
                                {productDetails && showProducts}

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
                                onClick={() => getProductDetails(productName)}
                            >Get Stock Details
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Dealer;
