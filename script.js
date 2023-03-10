// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, thumbnail, title }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const ol = document.querySelector('.cart__items');

// saveCartItems(ol.innerHTML); 

const subTotal = () => {
  const item = document.querySelectorAll('.cart__item');
  const precoTotal = document.querySelector('.total-price');
  let total = 0;

  for (let index = 0; index < item.length; index += 1) {
    const precoFinal = item[index].innerText.split('$')[1];
    total += parseFloat(precoFinal);
  }
precoTotal.innerText = `Total: $ ${(Math.round(total * 100) / 100)}`;
};

function cartItemClickListener(event) {
  event.target.remove();
  localStorage.removeItem('carrinho');
  saveCartItems(ol.innerHTML);
  subTotal();
}

const clickAfterReload = () => ol.addEventListener('click', cartItemClickListener);
clickAfterReload();

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<img class='cartimg' src='${thumbnail}'/>`; 
  li.innerHTML += `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

function btRemove() {
  ol.innerHTML = '';
  localStorage.removeItem('carrinho');
  subTotal();
}

const button = document.querySelector('.empty-cart');
button.addEventListener('click', btRemove);

function addEventBottom() {
  const itemSelected = document.querySelectorAll('.item__add');
  // console.log(itemSelected);
  itemSelected.forEach((elemento) => {
    elemento.addEventListener('click', async (e) => {
      const pai = e.path[1];
      const ID = pai.firstChild.innerText;
      const teste = await fetchItem(ID);
      ol.appendChild(createCartItemElement(teste));
      saveCartItems(ol.innerHTML);
      subTotal();
    });
  });
}

async function addProduto() {
  const produto = await fetchProducts('computador');
  const result = produto.results;
  const section1 = document.getElementsByClassName('items')[0];
  // console.log(section1);  
  for (let i = 0; i < result.length; i += 1) {
    section1.appendChild(createProductItemElement(result[i]));
  }
  document.querySelector('.loading').remove();
}

window.onload = async () => {
  await addProduto();
  ol.innerHTML = getSavedCartItems();
  addEventBottom();
  subTotal();
};
