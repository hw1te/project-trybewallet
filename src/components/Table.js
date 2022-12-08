import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.css'

class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão'];
    /* 'Editar/Excluir'  
    ## Retornar para a const tableHeaders quando a função de editar e excluir for implementada*/
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          {tableHeaders.map((tableHeader) => (
            <th key={tableHeader}>{tableHeader}</th>
          ))}
        </tr>
        {expenses.map((expense) => {
          const { description, tag, method, value, id } = expense;
          const number = Number(expense.value)
            * Number(expense.exchangeRates[expense.currency].ask);
          return (
            <tr key={id}>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              {/* Usei para o split https://github.com/tryber/sd-019-b-project-trybewallet/pull/85/commits/8761387cdb8ee06b0e7664765701d07f09925c89 */}
              < td > {expense.exchangeRates[expense.currency].name.split('/')[0]}</td >
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>{number.toFixed(2)}</td>
              <td>Real</td>
            </tr >
          );
        })
        }
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
