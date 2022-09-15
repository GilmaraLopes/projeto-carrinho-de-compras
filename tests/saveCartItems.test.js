const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  
  it('1.1 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    saveCartItems('Notebook');
    expect(localStorage.setItem).toBeCalled();
  });

  it('1.1 Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem com dois parâmetros, sendo o primeiro a chave cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    saveCartItems('Computador');
    expect(localStorage.setItem).toBeCalled('cartItems','Computador');
  });

});
