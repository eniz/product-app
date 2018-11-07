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
              href="https://www.n11.com"
              target="_blank"
              rel="noopener noreferrer">
              Product App
            </a>
          </div>
        </header>
        <Product />
      </div>
    );
  }
}

export default App;
