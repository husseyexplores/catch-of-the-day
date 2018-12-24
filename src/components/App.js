import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js';

class App extends Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
