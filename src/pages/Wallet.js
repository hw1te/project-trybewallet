import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { userEmail, currencies } = this.props;
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
        <div>
          <label htmlFor="value">
            Valor
            <input type="text" id="value" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" data-testid="description-input" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency">
              {
                currencies.map((currencie) => (
                  <option value={ currencie } key={ currencie }>{ currencie }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="method">
            Categora
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <Table />
        </div>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
