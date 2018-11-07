import React, { Component } from 'react';
import Product from './Product';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              N11 Case App
            </a>
          </div>
        </header>
        <Product />
      </div>
    );
  }
}

export default App;
