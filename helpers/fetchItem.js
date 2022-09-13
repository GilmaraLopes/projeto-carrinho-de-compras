const fetchItem = async (QUERY) => {
  const url = `https://api.mercadolibre.com/items/${QUERY}`;
  const fetchApi = await fetch(url);
  const products = await fetchApi.json();
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
