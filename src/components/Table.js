import React, { Component } from 'react';

class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          {tableHeaders.map((tableHeader) => (
            <th key={ tableHeader }>{ tableHeader }</th>
          ))}
        </tr>
      </table>
    );
  }
}

export default Table;
