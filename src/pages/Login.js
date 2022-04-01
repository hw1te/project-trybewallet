import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions/index';

// emailRegex: https://www.w3schools.com/jsref/jsref_regexp_test.asp
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleClick = () => {
    const { history, getEmail } = this.props;
    history.push('/carteira');
    getEmail(this.state);
  }

  enableButton = () => {
    const { email, password } = this.state;
    const minPasswordChar = 6;
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      && password.length >= minPasswordChar) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.enableButton();
    });
  }

  render() {
    const { disabled, password, email } = this.state;
    return (
      <>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  getEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (state) => dispatch(addUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
