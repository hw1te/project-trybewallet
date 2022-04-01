import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <div>
          User
          {' '}
          <h2 data-testid="email-field">
            { userEmail }
          </h2>
        </div>
        <div>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
