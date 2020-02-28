import React, { useState } from 'react';

const PartManufacturer = () => {

    const [productName, setProductName] = useState('');

    const addProduct = async (productName) => {
        console.log('productName: ', productName)
        const newProduct = {
            "$class": "org.nissan.dlf." + productName,
            "manufacturerId": "resource:org.nissan.dlf.PartManufacturer" + "MRB001"
        }

        const res = await fetch(`http://localhost:5000/${productName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)

        });
        const data = await res.json();
        console.log('newproduct', data);
    }


    return (
        <div className="row align-center" >
            <div className="col s12 m6">
                <div className="card blue darken-1" >
                    <div className="card-content white-text" >
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
                            <option value="PartManufacturer">Wheel</option>
                            <option value="CarManufacturer">Steering Wheel</option>
                        </select>



                    </div>
                    <div className="card-action">
                        <button
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={addProduct}
                        >Add Product
                            <i className="material-icons right">add</i>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default PartManufacturer;
