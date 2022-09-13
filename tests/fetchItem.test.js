require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('1.1 Verifique se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });
  
  it('1.2 Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  });

  it('1.3 Verifique se a função fetchItem foi chamada com o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
      expect(fetch).toBeCalledWith(url);
  });

  it('1.4 Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('1.5 Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    try {
      await fetchItem();
    } catch (e) {
      expect(e).toEqual(new Error('You must provide an url'));
    }
  });
});
