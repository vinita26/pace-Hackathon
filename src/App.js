import React, { useEffect } from 'react';
import './App.css';
import Home from './components/pages/Home';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  })
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
