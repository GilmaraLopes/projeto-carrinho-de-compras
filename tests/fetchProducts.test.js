require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { expect } = require('@jest/globals');

describe('1 - Teste a função fetchProducts', () => {
  it('1.1 Verifique se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts);
  });
  
  it('1.2 Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada;', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalledTimes(1);
  });

  it('1.3 Verifique se a função fetchProducts foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      expect(fetch).toBeCalledWith(url);
  });
});
