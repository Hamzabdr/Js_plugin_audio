import React, { Component } from 'react';
import './App.css';
import Gallery from './Gallery'
import Details from './Details'


import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <Router>
          <div>
            <Route exact path="/" component={Gallery} />
            <Route path="/details" component={Details} />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;