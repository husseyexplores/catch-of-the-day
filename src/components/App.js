import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sampleFishes from '../sample-fishes';

import Header from './Header.js';
import Fish from './Fish';
import Order from './Order.js';
import Inventory from './Inventory.js';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate local storage first
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }

    // sync the state
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take a copy
    const fishes = { ...this.state.fishes };
    // add the new data
    fishes[`fish${Date.now()}`] = fish;
    // update the state property
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToCart = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  updateFish = (key, fish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = fish;
    this.setState({ fishes });
  };

  removeFish = key => {
    // 1. Take a copy
    const fishes = { ...this.state.fishes };
    // 2. Update the state (delete fish)
    fishes[key] = null;
    // 3. update fish
    this.setState({ fishes });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToCart={this.addToCart}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          removeFish={this.removeFish}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

// App.propTypes = {};

// App.defaultProps = {};

export default App;
