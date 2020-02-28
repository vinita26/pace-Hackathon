import React, { useState } from 'react';

const CarManufacturer = () => {

    const [productName, setProductName] = useState('');
    const [stockValue, setStockValue] = useState(0);

    const getProductDetails = async (productName) => {
        console.log('productName: ', productName);

        const res = await fetch(`http://ec2-34-201-220-116.compute-1.amazonaws.com:8080/api/${productName}`);
        const data = await res.json();
        console.log('Product detail: ', data);
        setStockValue(data.length)
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

                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input placeholder="Value" id="total_stock_value" type="text" className="validate" value={stockValue} />
                                        {/* <label htmlFor="stock_value" className="white-text">Total items:</label> */}
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
        </div >
    )
}
export default CarManufacturer;
