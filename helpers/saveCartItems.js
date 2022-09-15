const saveCartItems = (param1) => {
  // const ol = document.getElementsByClassName('cart__items')[0];

  // const addLocalStorage = () => {
  //   const listaCarrinho = ol;
    localStorage.setItem('carrinho', param1);
  };

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
