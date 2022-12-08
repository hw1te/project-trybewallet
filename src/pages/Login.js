import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../actions/index';
import './Login.css'

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
    const number = 5;
    const checkPassword = password.length > number;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkedEmail = emailRegex.test(email);
    if (checkedEmail && checkPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
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
      <div className="login-container">
        <div className="login-body">
          <h1>Trybewallet</h1>
          <input
            className="login-input"
            type="email"
            name="email"
            data-testid="email-input"
            value={email}
            onChange={this.handleChange}
          />
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            data-testid="password-input"
            onChange={this.handleChange}
          />
          <button
            className="login-button"
            type="button"
            disabled={disabled}
            onClick={this.handleClick}
          >
            Entrar
          </button>
        </div>
      </div>
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
