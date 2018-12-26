import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    index: PropTypes.string,
    fish: PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    }),
    removeFish: PropTypes.func,
    updateFish: PropTypes.func,
  };

  handleChange = e => {
    // update the fish
    // 1. Take a copy of the current fish;
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value,
    };

    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          type="text"
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.removeFish(this.props.index)}>
          Remove
        </button>
      </div>
    );
  }
}

// EditFishForm.defaultProps = {};

export default EditFishForm;
