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
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
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
 const addLocalStorage = () => {
  const listaCarrinho = ol;
  localStorage.setItem('carrinho', listaCarrinho.innerHTML);
  console.log(listaCarrinho.innerHTML);
  // console.log(typeOf(listaCarrinho.innerHTML));
  // const teste = JSON.stringify({ ol });
  // console.log(teste);
};

function cartItemClickListener(event) {
  event.target.remove();
  addLocalStorage();
}

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const ol = document.getElementsByClassName('cart__items')[0];
// console.log(typeof (ol));

// function addLocalStorage() {
//   let dados = localStorage.getItem('dadosProdutos');
//   console.log(dados);
//   if (dados == null) {
//     localStorage.setItem('dadosProdutos', '[]');
//     dados = [];
//   }
// }

const pegarItemLocalStorage = () => {
  const lista = localStorage.getItem('carrinho');
  // console.log(lista);
  ol.innerHTML = lista;
  const LIS = ol.querySelectorAll('li');
  LIS.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};
// 
// console.log(addLocalStorage);
// localStorage.getItem('ID');

function btRemove() {
  ol.innerHTML = '';
  addLocalStorage();
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
      addLocalStorage();
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
}

window.onload = async () => {
  await addProduto();
  addEventBottom();
  pegarItemLocalStorage();
  //  createCartItemElement();
};
