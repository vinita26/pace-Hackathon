import React, { useState } from 'react';

const Login = () => {

    const [stackholderType, setStackholderType] = useState('');
    const [stackholderData, setStackholderData] = useState([]);

    const login = () => {
        console.log('Login function', stackholderType, stackholderData);
    }

    const updateStackholderType = (value) => {
        console.log("inside update")
        console.log("type before:", value)
        setStackholderType(value);
        console.log("type after:", stackholderType)
        getStackholderData(stackholderType);
    }

    const getStackholderData = async (stackholderType) => {
        console.log('stackholderType value: ', stackholderType)
        const res = await fetch(`http://localhost:5000/${stackholderType}`);
        const data = await res.json();
        console.log('names', data)
        setStackholderData(data);
        console.log("stackholderData:", stackholderData)
    }

    return (
        <div className="row align-center" >
            <div className="col s12 m6">
                <div className="card blue darken-1" >
                    <div className="card-content white-text" >
                        <span className="card-title" >Login As:</span>

                        <label className="white-text">Select Stackholder Type</label>
                        <select
                            name="stackholderType"
                            className="browser-default"
                            value={stackholderType}
                            onChange={e => {
                                updateStackholderType(e.target.value);
                            }
                            }
                        >
                            <option value="" disabled >Choose your option</option>
                            <option value="PartManufacturer">PartManufacturer</option>
                            <option value="CarManufacturer">CarManufacturer</option>
                            <option value="Dealer">Dealer</option>
                            <option value="CarUser">CarUser</option>
                        </select>

                        <label className="white-text">Select Stackholder Name</label>

                        <select
                            name="stackholderNames"
                            className="browser-default"
                            value={stackholderData}
                            onChange={e => setStackholderData(e.target.value)}
                        >
                            <option value="" disabled >Choose your option</option>
                            {stackholderData !== null && stackholderData.map(stackholder => (
                                <option key={stackholder.participantID} value={stackholder.name}>{stackholder.name}</option>
                            ))}
                        </select>

                    </div>
                    <div className="card-action">
                        <button
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={login}
                        >Login
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Login;
