const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const fetchApi = await fetch(url);
  const products = await fetchApi.json();
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}