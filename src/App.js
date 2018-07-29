import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Countries from './components/Countries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Select a country from the dropdown list or make a search e.g. mal,lon,gr </h1>
        </header>
        <div className="container">
          <div>

          </div>
          <div>
            <Countries />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
