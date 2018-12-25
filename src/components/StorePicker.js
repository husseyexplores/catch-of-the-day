import React, { Fragment, Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  storeInput = React.createRef();

  goToStore = e => {
    e.preventDefault();
    // get the input text
    const storeName = this.storeInput.current.value;

    // redirect to that store url
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input
            type="text"
            ref={this.storeInput}
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store →</button>
        </form>
      </Fragment>
    );
  }
}

export default StorePicker;
