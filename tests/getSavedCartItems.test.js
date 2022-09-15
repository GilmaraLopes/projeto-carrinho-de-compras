const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  
  it('1.1 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.getItem é chamado', () => {
    getSavedCartItems('Notebook');
    expect(localStorage.getItem).toBeCalled();
  });

  it('1.2 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.getItem com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    getSavedCartItems('Computador');
    expect(localStorage.getItem).toBeCalled('cartItems','Computador');
  });
});
