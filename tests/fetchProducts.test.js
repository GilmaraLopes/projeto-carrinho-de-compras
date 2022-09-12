require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
const { expect } = require('@jest/globals');

describe('1 - Teste a função fetchProducts', () => {
  it('1.1 Verifique se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  
  it('1.2 Execute a função fetchProducts com o argumento computador e teste se fetch foi chamada;', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  it('1.3 Verifique se a função fetchProducts foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      expect(fetch).toBeCalledWith(url);
  });

  it('1.4 Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('1.5 Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    try {
      await fetchProducts();
    } catch (e) {
      expect(e).toMatch('You must provide an url');
    }
  });
});
