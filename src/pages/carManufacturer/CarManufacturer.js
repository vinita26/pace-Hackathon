import React, { useState } from 'react';

const CarManufacturer = () => {

    const [productName, setProductName] = useState('');
    const [stockValue, setStockValue] = useState(0);

    const getProductDetails = async (productName) => {
        console.log('productName: ', productName);

        // const res = await fetch(`http://ec2-34-201-220-116.compute-1.amazonaws.com:8080/api/${productName}`);
        const res = await fetch(`http://localhost:5000/${productName}`);
        //const res = await fetch(`http://localhost:5000/Wheel`);
        const data = await res.json();
        console.log('Product detail: ', data);
        setStockValue(data.length)
    }

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
                                onChange={e => setProductName(e.target.value)}
                            >
                                <option value="" disabled >Choose Product</option>
                                <option value="Wheel">Wheel</option>
                                <option value="SteeringWheel">SteeringWheel</option>
                            </select>

                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="col s6">
                                            <span> <strong>Total Stock:</strong></span>
                                        </div>

                                        {/* <div className="input-field col s2"> */}
                                        <div className="col s6">
                                            <input placeholder="Value" id="total_stock_value" type="text" className="validate white-text" value={stockValue} />
                                        </div>
                                    </div>
                                </form>
                            </div>

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
export default CarManufacturer;