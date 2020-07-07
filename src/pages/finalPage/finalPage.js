import React, { useState } from 'react';

const finalPage = (props) => {

    console.log("in finalpage");

    return (
        <div className="container" >
            <div className="row valign-wrapper">
                <div className="col s6 offset-s3 valign">
                    <div className="card blue darken-1" >
                        <div className="card-content white-text" >
                            <span className="card-title" >Current Stock:</span>
                            <button className="waves-effect waves-light btn" >Get</button>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div >
    )
}

export default finalPage;