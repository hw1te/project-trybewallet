import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [1],
  expenses: [2],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state, currencies: action.state,
    };
  default:
    return state;
  }
};

export default wallet;
