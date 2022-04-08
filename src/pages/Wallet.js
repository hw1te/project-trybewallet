import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAPI, fetchExpensesAPI } from '../actions';
import Table from '../components/Table';

const ALIMENTAÇÃO = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÃO,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  }

  handleClick = () => {
    const { id } = this.state;
    const { getExpenses } = this.props;
    getExpenses(this.state);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÃO,
    });
  }

  totalValue = () => {
    const { expenses } = this.props;
    let initialState = 0;
    expenses.forEach((expense) => {
      initialState += Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask);
      return initialState;
    });
    return initialState.toFixed(2);
  }

  render() {
    const { userEmail, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const totalValue = this.totalValue();
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
          <p data-testid="total-field">{ totalValue }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <label htmlFor="value">
            Valor
            <input
              type="text"
              id="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              value={ currency }
              id="currency"
              onChange={ this.handleChange }
            >
              {
                currencies.map((currencie) => (
                  <option value={ currencie } key={ currencie }>{ currencie }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
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
  getExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrenciesAPI()),
  getExpenses: (state) => dispatch(fetchExpensesAPI(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
