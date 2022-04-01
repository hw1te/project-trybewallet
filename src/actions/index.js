export const ADD_USER = 'ADD_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const addUser = (state) => ({
  type: ADD_USER, state,
});

export const fetchCurrencies = (state) => ({
  type: GET_CURRENCIES, state,
});

export const fetchAPI = () => async (dispatch) => {
  // Fiz o código da linha 12 com referência ao do João Kruschewsky: https://github.com/tryber/sd-019-b-project-trybewallet/pull/108/commits/9da1cea6d07593a7bf213b7a6ee4f4bf6330b363
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const result = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(fetchCurrencies(result));
};
