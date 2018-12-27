import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="Logim">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store`s inventory</p>
    <button className="github" onClick={() => authenticate('Github')}>
      Log in with Github
    </button>
    <button className="facebook" onClick={() => authenticate('Facebook')}>
      Log in with Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

// Login.defaultProps = {

// };

export default Login;
