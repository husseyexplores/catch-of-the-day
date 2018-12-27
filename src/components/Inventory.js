import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends Component {
  state = {
    userId: null,
    owner: null,
  };

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const { storeId } = this.props;
    // 1. Look up the current store in firebase db
    const store = await base.fetch(storeId, { content: this });

    // 2. Claim it if there is not owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }

    // 3. Set the state of inventory component to reflect the current user
    this.setState({
      userId: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ userId: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;

    // 1. Check if the user is logged in
    if (!this.state.userId) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if the user is not the owner of the store
    if (this.state.userId !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      );
    }

    // 3. User must be the owner, render the inventory
    return (
      <div className="inventory">
        {logout}
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            removeFish={this.props.removeFish}
            index={key}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

// Inventory.propTypes = {};

// Inventory.defaultProps = {};

export default Inventory;
